module.exports = {

  index: function(req, res) {
    res.header("Content-Type",'text/html');
    res.end("<h1>Welcome!</h1>");
  },

  api_index: function(req, res) {
    res.json({
      message: 'welcome to the API, documentation: https://school.yoeori.nl/services/pws/docs',
      stable: 'v1'
    });
    res.end();
  },

  api_v1: function(req, res) {
    res.json({
      message: 'welcome to the v1 API, documentation: https://school.yoeori.nl/services/pws/docs/v1',
      version: 'v1',
      urls: [
        {
          "method": "GET",
          "url": "/"
        }
      ]
    });
    res.end();
  }

}
