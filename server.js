var config = require('./appconfig.json');
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: config["uploadDir"] })
var app = express();
var composer = require('./lib/composer');
var admin = require('./lib/participants/admin');
var perfilpersonal = require('./lib/assets/perfilpersonal');
var perfilpublico = require('./lib/assets/perfilpublico');

// Ping the network
app.post('/ping',upload.single('card'), function Ping(req,res,next) {
    var response;
    composer.ping(req,function(res){response = res;})
    res.send(response);
});

/* --------- PARTICIPANT ADMIN -------- */
// Create
app.post('/participant/admin', upload.single('card'), function CreateAdmin(req,res,next){
    var response;
    admin.create(req,function(res){response = res;})
    res.send(response);
});
// Get
app.post('/participant/getAdmins', upload.single('card'), function ReadAdmins(req,res,next){
    var response;
    admin.read(req,function(res){response = res;})
    res.send(response);
});

/* --------- PERFIL PERSONAL ---------- */
// Create
app.post('/asset/createPerfilPersonal', upload.single('card'),function ReadAssets(req,res,next){
    var response;
    perfilpersonal.create(req,res,function(res){response=res;});
    res.send(response);
});
// Get
app.post('/asset/getPerfilPersonal',upload.single('card'),function getAllPp(req,res,next){
    var response;
    perfilpersonal.getAll(req,res,function(res){response=res;});
    res.send(response);
});
// Get by id
app.post('/asset/getPerfilPersonalByID',upload.single('card'),function getPpById(req,res,next){
    var response;
    perfilpersonal.getById(req,res,function(res){response=res;});
    res.send(response);
});
// Delete
app.post('/asset/deletePerfilPersonal',upload.single('card'),function deletePp(req,res,next){
    var response;
    perfilpersonal.delete(req,res,function(res){response=res;});
    res.send(response);
});
// Update
app.post('/asset/updatePerfilPersonal',upload.single('card'),function updatePp(req,res,next){
    var response;
    perfilpersonal.update(req,res,function(res){response=res;});
    res.send(response);
});

/* --------- PERFIL PUBLICO ---------- */
// Create
app.post('/asset/createPerfilPublico', upload.single('card'),function ReadAssets(req,res,next){
    var response;
    perfilpublico.create(req,res,function(res){response=res;});
    res.send(response);
});
// Get
app.post('/asset/getPerfilPublico',upload.single('card'),function getAllPp(req,res,next){
    var response;
    perfilpublico.getAll(req,res,function(res){response=res;});
    res.send(response);
});
// Get by id
app.post('/asset/getPerfilPublicoByID',upload.single('card'),function getPpById(req,res,next){
    var response;
    perfilpublico.getById(req,res,function(res){response=res;});
    res.send(response);
});
// Delete
app.post('/asset/deletePerfilPublico',upload.single('card'),function deletePp(req,res,next){
    var response;
    perfilpublico.delete(req,res,function(res){response=res;});
    res.send(response);
});
// Update
app.post('/asset/updatePerfilPublico',upload.single('card'),function updatePp(req,res,next){
    var response;
    perfilpublico.update(req,res,function(res){response=res;});
    res.send(response);
});

// Start server
app.listen(config["port"],config["host"]);