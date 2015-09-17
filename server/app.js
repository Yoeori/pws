var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'This API is a work in progress' });
});

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on [::]:' + port);
