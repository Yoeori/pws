//controllers
var IndexController = require('./controllers/index_controller');
var UserController = require('./controllers/user_controller');
var KeyController = require('./controllers/key_controller');

module.exports = function(r, app) {
  r.get("/", IndexController.index);
  r.get("/api", IndexController.api_index);
  r.get("/api/v1", IndexController.api_v1);
  r.all('*', UserController.check_authentication);
  return r;
}
