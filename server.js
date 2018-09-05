var config = require('./appconfig.json');
var express = require('express');
var bodyParser = require('body-parser')
var multer  = require('multer')
var upload = multer({ dest: config["uploadDir"] })
var app = express();
var composer = require('./lib/composer')

// Hacer ping a la red
app.post('/ping',upload.single('card'), function Ping(req,res,next) {
    var response;
    composer.ping(req,function(res){response = res;})
    console.log(response)
    res.send(response);
});

// Iniciar servidor
app.listen(config["port"],config["host"]);