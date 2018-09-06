var config = require('./appconfig.json');
var express = require('express');
var bodyParser = require('body-parser')
var multer  = require('multer')
var upload = multer({ dest: config["uploadDir"] })
var app = express();
var composer = require('./lib/composer');
var admin = require('./lib/participants/admin');


// Ping the network
app.post('/ping',upload.single('card'), function Ping(req,res,next) {
    var response;
    composer.ping(req,function(res){response = res;})
    res.send(response);
});

// Create admin
app.post('/participant/admin', upload.single('card'), function CreateAdmin(req,res,next){
    var response;
    admin.create(req,function(res){response = res;})
    res.send(response);
});

// Read all admins
app.post('/participant/getAdmins', upload.single('card'), function ReadAdmins(req,res,next){
    var response;
    admin.read(req,function(res){response = res;})
    res.send(response);
});


// Start server
app.listen(config["port"],config["host"]);