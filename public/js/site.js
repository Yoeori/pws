var openpgp = window.openpgp;

var options = {
    numBits: 2048,
    userId: 'Jon Smith <jon.smith@example.org>',
    passphrase: 'super long and hard to guess secret'
};

window.onload = function() {
  openpgp.generateKeyPair(options).then(function(keypair) {
      // success
      var privkey = keypair.privateKeyArmored;
      var pubkey = keypair.publicKeyArmored;
      console.log(pubkey);

  }).catch(function(error) {
      // failure
  });

}
