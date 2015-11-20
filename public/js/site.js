var savedata = {}, view, current_user_id, interval;

function register_user() {
  view.render("username");

  $("#registerform").submit(function() {
    $("#errormessage").addClass("hidden");
    $("#username").prop("disabled", true);

    var username = $("#username").val();

    console.log("started registration process for: " + username);

    //Generate key pair
    var options = {
        numBits: 2048,
        userId: username + ' <' + username + '@pws.yoeori.nl>',
    };

    openpgp.generateKeyPair(options).then(function(keypair) {
        console.log("generated keypair");
        savedata.keypair = keypair;
        
        var registerreq = new ApiRequest();
        registerreq.url("users?key="+encodeURIComponent(savedata.keypair.publicKeyArmored)+"&name="+encodeURIComponent(username)).method("post");

        registerreq.run().then(function(data) {
          if(data.error == true) {
            $("#errormessage").removeClass("hidden");
            $("#username").prop("disabled", false);
          } else {
            console.log("finished registering, now creating public profile");

            savedata.token = data.token;
            savedata.username = data.user.username;
            savedata.contacts = [];
            save();
            after_initialization();
          }
        });

    }).catch(function(error) {
      console.log("Lol something went wrong #rekt:" + error);
    });


  });
}

function send_message(user, un_message) {
  openpgp.signAndEncryptMessage(openpgp.key.readArmored(user.pubkey).keys, savedata.keypair.key, un_message).then(function(message) {
    var send = new ApiRequest();
    send.url("/messages?token="+encodeURIComponent(savedata.token)+"&message="+encodeURIComponent(message)+"&user_id="+encodeURIComponent(user.id)).method("post")
    send.run().then(function(result) {
      user.history.push({from: savedata.username, message:un_message, own:true});
      show_chat_view_from_id(user.id);
      save();
    });
  });
}

  function receive_messages() {
  var request = new ApiRequest();
  request.url("messages?token="+ encodeURIComponent(savedata.token));
  request.run().then(function(result) {
    var messages = result.messages;
    for(var o = 0; o < messages.length; o++) {
      add_encrypted_message_for_user_id(messages[o].from_id, messages[o].message);
    }
  });
  save();
}

function add_encrypted_message_for_user_id(user_id, message) {
  var publickey;
  for(var i = 0; i < savedata.contacts.length; i++) {
    if(savedata.contacts[i].id == user_id) {
      user = savedata.contacts[i];
      publickey = user.pubkey;
    }
  }
  //TODO fix signing issue
  openpgp.decryptMessage(savedata.keypair.key, openpgp.message.readArmored(message)).then(function(message) {
    add_message_for_user_id(user_id, message);
  });
}

function add_message_for_user_id(user_id, message) {
  for(var i = 0; i < savedata.contacts.length; i++) {
    if(savedata.contacts[i].id == user_id) {
      user = savedata.contacts[i];
      user.history.push({from: user.username, message:message});
    }
  }
  if(current_user_id == user_id && view.current == "chatview") {
    show_chat_view_from_id(current_user_id);
  }
}

function show_chat_view_from_id(user_id) {
  var user, i, actual_user;

  var contacts = jQuery.extend(true, [], savedata.contacts);

  for(var i = 0; i < contacts.length; i++) {
    if(contacts[i].id == user_id) {
      user = contacts[i];
      actual_user = savedata.contacts[i]
      contacts[i].selected = true;
    }
  }

  view.render("chatview", {users: contacts, messages: user.history});
  setup_add_contact_button_and_user_buttons();
  $("#chatbox").scrollTop(2000); //TODO change this
  current_user_id = user.id;
  
  //TODO sending form
  $("#messageform").submit(function() {
    $("#message").prop("disabled", true);
    send_message(actual_user, $("#message").val());
  });
}

function after_initialization() {

  view.render("base", {users: savedata.contacts});
  setup_add_contact_button_and_user_buttons();

  interval = setInterval(function() {
    receive_messages();
  }, 1000);

}

function setup_add_contact_button_and_user_buttons() {
  $("#addcontact").click(function() {
    view.render("add_contact", {users: savedata.contacts});
    $("#addcontactform").submit(function() {

      $("#errormessage").addClass("hidden");
      var name = $("#contact").val();

      var request = new ApiRequest();
      request.url("users?name=" + encodeURIComponent(name));
      request.run().then(function(result) {
        //TODO console.log(openpgp.key.readArmored(user.pubkey).keys[0].primaryKey.fingerprint); implement identicon
        if(result.users.length >= 1) {
          var new_contact = result.users[0];
          new_contact.history = [];
          savedata.contacts.push(new_contact);
          save();
          after_initialization();
        } else {
          $("#errormessage").removeClass("hidden");
        }
      });

    });
  });
  $('[data-name="user"]').each(function() {
    $(this).click(function() {
      var id = $(this).attr("data-id");
      show_chat_view_from_id(id);
    })
  });
}

function save() {
  var tojsondata = {};
  for(key in savedata) {
    if(key == "keypair") {
      tojsondata["publickey"] = savedata.keypair.publicKeyArmored;
      tojsondata["privatekey"] = savedata.keypair.privateKeyArmored;
      continue;
    }
    tojsondata[key] = savedata[key];
  }
  var stringdata = JSON.stringify(tojsondata);
  localStorage.setItem('data', stringdata);
}

function load() {
  console.log("loading from localstorage");
  var data_to_be_loaded = JSON.parse(localStorage.getItem("data"));
  savedata["keypair"] = {};
  for(key in data_to_be_loaded) {
    if(key == "privatekey") {
      savedata.keypair.key = openpgp.key.readArmored(data_to_be_loaded[key]).keys[0];
    }
    savedata[key] = data_to_be_loaded[key];
  }
  after_initialization();
}

function destroy() {
  clearInterval(interval);
  localStorage.clear();
}

function initialize() {
  view = Object.create(ViewManager);
  view.initialize(function() {
    if(localStorage.getItem("data") != null) {
      load();
    } else {
      register_user();
    }
  });
}

window.onload = initialize;
