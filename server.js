var config = require('./appconfig.json');
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: config["uploadDir"] })
var app = express();
var composer = require('./lib/composer');
var admin = require('./lib/participants/admin');
var perfilpersonal = require('./lib/assets/perfilpersonal');
var perfilpublico = require('./lib/assets/perfilpublico');
var paciente = require('./lib/participants/patient');
var doctor = require('./lib/participants/doctor');
var historial = require('./lib/assets/historialmedico');
var registryAccess = require('./lib/transactions/registryAccess');
process.title = "apimedicalchain";

// Ping the network
app.post('/ping',upload.single('card'), function Ping(req,res,next) {
    var response;
    composer.ping(req,res,function(res){response = res;});
    res.send(response);
});

/* ------------ TRANSACTIONS ------------ */
app.post('/transaction/giveAccess', upload.single('card'), function giveAccess(req,res,next){
    var response;
    registryAccess.giveAccess(req,res,function(res){response = res;});
    res.send(response);
});
app.post('/transaction/revoqueAccess', upload.single('card'), function revoqueAccess(req,res,next){
    var response;
    registryAccess.revoqueAccess(req,res,function(res){response = res;});
    res.send(response);
});
/* --------- PARTICIPANT DOCTOR --------- */
// Create
app.post('/participant/createDoctor', upload.single('card'), function CreateDoctor(req,res,next){
    var response;
    doctor.create(req,res,function(res){response = res;});
    res.send(response);
});
// Get all
app.post('/participant/getDoctors', upload.single('card'), function getDoctors(req,res,next){
    var response;
    doctor.getAll(req,res,function(res){response = res;});
    res.send(response);
});
// Get by id
app.post('/participant/getDoctorsById', upload.single('card'), function getDoctorsById(req,res,next){
    var response;
    doctor.getById(req,res,function(res){response = res;});
    res.send(response);
});
// Update
app.post('/participant/updateDoctor', upload.single('card'), function updateDoctor(req,res,next){
    var response;
    doctor.update(req,res,function(res){response = res;});
    res.send(response);
});
// Delete
app.post('/participant/deleteDoctor', upload.single('card'), function deleteDoctor(req,res,next){
    var response;
    doctor.delete(req,res,function(res){response = res;});
    res.send(response);
});

/* --------- PARTICIPANT PATIENT -------- */
// Create
app.post('/participant/createPatient', upload.single('card'), function CreatePatient(req,res,next){
    var response;
    paciente.create(req,res,function(res){response = res;});
    res.send(response);
});
// Get all
app.post('/participant/getPatients', upload.single('card'), function getPatients(req,res,next){
    var response;
    paciente.getAll(req,res,function(res){response = res;});
    res.send(response);
});
// Get by id
app.post('/participant/getPatientsById', upload.single('card'), function getPatientsById(req,res,next){
    var response;
    paciente.getById(req,res,function(res){response = res;});
    res.send(response);
});
// Update
app.post('/participant/updatePatient', upload.single('card'), function updatePatient(req,res,next){
    var response;
    paciente.update(req,res,function(res){response = res;});
    res.send(response);
});
// Delete
app.post('/participant/deletePatient', upload.single('card'), function deletePatient(req,res,next){
    var response;
    paciente.delete(req,res,function(res){response = res;});
    res.send(response);
});

/* --------- PARTICIPANT ADMIN -------- */
// Create
app.post('/participant/createAdmin', upload.single('card'), function CreateAdmin(req,res,next){
    var response;
    admin.create(req,res,function(res){response = res;});
    res.send(response);
});
// Get all
app.post('/participant/getAdmins', upload.single('card'), function getAdmins(req,res,next){
    var response;
    admin.getAll(req,res,function(res){response = res;});
    res.send(response);
});
// Get by id
app.post('/participant/getAdminsById', upload.single('card'), function getAdminsById(req,res,next){
    var response;
    admin.getById(req,res,function(res){response = res;});
    res.send(response);
});
// Update
app.post('/participant/updateAdmin', upload.single('card'), function updateAdmin(req,res,next){
    var response;
    admin.update(req,res,function(res){response = res;});
    res.send(response);
});
// Delete
app.post('/participant/deleteAdmin', upload.single('card'), function deleteAdmin(req,res,next){
    var response;
    admin.delete(req,res,function(res){response = res;});
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
app.post('/asset/createPerfilPublico', upload.single('card'),function CreatePPAssets(req,res,next){
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

/* --------- HISTORIAL MEDICO --------- */

// Create
app.post('/asset/createHistorialMedico', upload.single('card'),function CreateAssetsHH(req,res,next){
    var response;
    historial.create(req,res,function(res){response=res;});
    res.send(response);
});
// Get
app.post('/asset/getHistorialMedico',upload.single('card'),function getAllPp(req,res,next){
    var response;
    historial.getAll(req,res,function(res){response=res;});
    res.send(response);
});
// Get by id
app.post('/asset/getHistorialMedicoByID',upload.single('card'),function getPpById(req,res,next){
    var response;
    historial.getById(req,res,function(res){response=res;});
    res.send(response);
});
// Delete
app.post('/asset/deleteHistorialMedico',upload.single('card'),function deletePp(req,res,next){
    var response;
    historial.delete(req,res,function(res){response=res;});
    res.send(response);
});

// Start server
app.listen(config["port"],config["host"]);