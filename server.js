var express = require('express');
var config = require('./appconfig.json');
var format = require('./format/convert');
var app = express();



// Iniciar servidor
app.listen(host=config["host"],port=config["port"])