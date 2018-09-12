var format = require('../../format/convert');
var config = require('../../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect
var card = require("../cards");

module.exports = {
    revoqueAccess: function(req,res,callback) {
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (
            typeof req.body.idRegistry == 'undefined' ||
            typeof req.body.idDoctor == 'undefined'
        ){
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            card.remove(req);
            return;                        
        }
        // Submit transaction
        var data = {
            $class : "org.example.empty.RevocarAccesoMedico",
            registro: "resource:org.example.empty.HistorialMedico#"+req.body.idRegistry,
            medico:"resource:org.example.empty.Medico#"+req.body.idDoctor
            }
        data = JSON.stringify(data);
        data = "'" + data + "'";
        // Create the participant
        shell.exec("./lib/scripts/transactionSubmit.sh "+req.file.originalname+" " + data);
        format.getStatus("./lib/tmp/"+req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            callback(response);
            card.remove(req);
            return;            
        }
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req);
        callback(response);
    },

    giveAccess: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (
            typeof req.body.idRegistry == 'undefined' ||
            typeof req.body.idDoctor == 'undefined'
        ){
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            card.remove(req);
            return;                        
        }
        // Submit transaction
        var data = {
            $class : "org.example.empty.AsignarPermisos",
            registro: "resource:org.example.empty.HistorialMedico#"+req.body.idRegistry,
            medico:"resource:org.example.empty.Medico#"+req.body.idDoctor
            }
        data = JSON.stringify(data);
        data = "'" + data + "'";
        // Create the participant
        shell.exec("./lib/scripts/transactionSubmit.sh "+req.file.originalname+" " + data);
        format.getStatus("./lib/tmp/"+req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            callback(response);
            card.remove(req);
            return;            
        }
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req);
        callback(response);
    }
}