var config = require('./appconfig.json');
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: config["uploadDir"] })
var app = express();
var composer = require('./lib/composer');
var admin = require('./lib/participants/admin');
var perfilpersonal = require('./lib/assets/perfilpersonal');


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

app.post('/asset/createPerfilPersonal', upload.single('card'),function ReadAssets(req,res,next){
    var response;
    perfilpersonal.create(req,res,function(res){response=res;});
    res.send(response);
});

app.post('/asset/getPerfilPersonal',upload.single('card'),function getAllPp(req,res,next){
    var response;
    perfilpersonal.getAll(req,res,function(res){response=res;});
    res.send(response);
});

app.post('/asset/getPerfilPersonalByID',upload.single('card'),function getPpById(req,res,next){
    var response;
    perfilpersonal.getById(req,res,function(res){response=res;});
    res.send(response);
});

app.post('/asset/deletePerfilPersonal',upload.single('card'),function deletePp(req,res,next){
    var response;
    perfilpersonal.delete(req,res,function(res){response=res;});
    res.send(response);
});

app.post('/asset/updatePerfilPersonal',upload.single('card'),function updatePp(req,res,next){
    var response;
    perfilpersonal.update(req,res,function(res){response=res;});
    res.send(response);
});

// Start server
app.listen(config["port"],config["host"]);