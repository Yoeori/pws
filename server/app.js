var Router = require("./router");

module.exports = {
  server: undefined,
  router: undefined,

  init: function(server) {
    this.server = server;
    this.router = Router(require('express').Router(), this);
    server.use(this.router);
  }


}
