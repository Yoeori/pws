function ApiRequest(type) {
  this._method = "GET";
  this._headers = {
    "Content-Type": "application/json;charset=UTF-8",
  };
}

ApiRequest.prototype = {

  host: function() {
    return "";
  },

  url: function(url) {
    if(arguments.length >= 1) {
      this._url = url;
      return this;
    }

    if(typeof this._url !== "undefined") return "api/" + this._url;
    else return "api/";

  },

  full_url: function() {
    return this.host() + this.url();
  },

  port: function() {
    return 443;
  },

  method: function(method) {
    if(arguments.length >= 1) {
      method = method.toUpperCase();
      var supported_methods = ["GET", "POST", "PUT", "DELETE"];
      if(supported_methods.indexOf(method) > -1) {
        this._method = method;
      }
      return this;
    }
    return this._method;
  },

  headers: function() {
    if(arguments.length >= 1) {
      if(typeof this._headers == "undefined") this._headers = {};

      var headers = {};

      // check how the headers are given
  		if(arguments.length > 1 && arguments.length % 2 === 0) {
  			for(var i = 0; i < arguments.length;) {
  				headers[arguments[i]] = arguments[i+1];
  				i = i+2;
  			}
  		} else if(arguments.length === 1 && typeof(arguments[0]) === "object" && !Array.isArray(arguments[0])) {
  			headers = arguments[0];
  		}

      // merge the objects.
  		for(var header in headers) {
  			this._headers[header] = headers[header];
  		}

  		return this;
    }
    return this._headers;
  },

  cookies: function(cookies) {
    var cookieHeaderValue = "";

		for(var cookie in cookies) {
			cookieHeaderValue += cookie+"="+cookies[cookie]+";";
		}

		this.headers = {"Cookie": cookieHeaderValue};

		return this;
  },

  payload: function(payload) {
    if(arguments.length >= 1) {
      this._payload = JSON.stringify(payload);
      return this;
    } else {
      return typeof this._payload !== "undefined" ? this._payload : "";
    }
  },

  data: function(data) {
    if(arguments.length >= 1) {
      this._data = data;
      return this;
    } else {
      return typeof this._data !== "undefined" ? this._data : {};
    }
  },

  run: function(callback) {
    var self = this;

    return new Promise(function(resolve, reject) {

      $.ajax({
  			url: self.full_url(),
  			method: self.method(),
  			headers: self.headers(),
        data: self.data()
  		}).done(function(file) {
        resolve(file);
      }).fail(function() {
        reject();
      });

    });
	}
};
