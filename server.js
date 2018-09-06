var config = require('./appconfig.json');
var express = require('express');
var bodyParser = require('body-parser')
var multer  = require('multer')
var upload = multer({ dest: config["uploadDir"] })
var app = express();
var composer = require('./lib/composer');
var admin = require('./lib/participants/admin');


// Hacer ping a la red
app.post('/ping',upload.single('card'), function Ping(req,res,next) {
    var response;
    composer.ping(req,function(res){response = res;})
    res.send(response);
});

// Crear Administrador
app.post('/participant/admin',upload.single('card'), function AdminCreate(req,res,next){
    var response;
    admin.create(req,function(res){response = res;})
    res.send(response);
});

// Iniciar servidor
app.listen(config["port"],config["host"]);