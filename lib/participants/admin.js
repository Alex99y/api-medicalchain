var format = require('../../format/convert');
var config = require('../../appconfig.json');
var card = require("../cards");
const shell = require('shelljs');
var expect = require('chai').expect


module.exports = {
    create: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (
            typeof req.body.id == 'undefined' ||
            typeof req.body.name == 'undefined' ||
            typeof req.body.lastname == 'undefined'
        ){
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            card.remove(req);
            return;                        
        }
        var data = {
            $class : "org.hyperledger.composer.system.AddParticipant",
            targetRegistry : "resource:org.hyperledger.composer.system.ParticipantRegistry#org.example.empty.Administrador",
            resources : [{
                $class: "org.example.empty.Administrador",
                S: "Administrador",
                id: req.body.id,
                name: req.body.name,
                lastname: req.body.lastname
                
            }]
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
    getAll: function(req,res,callback){
        var output, status,response;
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Execute command ~ composer network list -c {CARD}
        shell.exec("./lib/scripts/networkList.sh "+req.file.originalname);
        format.separate("./lib/tmp/" + req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            callback(response);
            card.remove(req)
            return;            
        }
        if ( typeof output.registries["org.example.empty.Administrador"].assets == 'undefined' ){
            output = "{}";
        }else{
            output = JSON.stringify(output.registries["org.example.empty.Administrador"].assets);
        }
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req)
        callback(response);        
    },
    getById: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        if (typeof req.body.id == 'undefined') {
            response = '{"status":"fail", "message":"Missing ID Param" }'
            callback(response);
            card.remove(req)
            return;                        
        }
        // Execute command ~ composer network list -c {CARD}
        shell.exec("./lib/scripts/networkList.sh "+req.file.originalname);
        format.separate("./lib/tmp/" + req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            callback(response);
            card.remove(req)
            return;            
        }
        if ( typeof output.registries["org.example.empty.Administrador"].assets == 'undefined' ){
            output = "{}";
        }else{
            if (typeof output.registries["org.example.empty.Administrador"].assets[req.body.id] == 'undefined') {
                output = "{}";
            }else{
                output = output = JSON.stringify(output.registries["org.example.empty.Administrador"].assets[req.body.id]);
            }
        }
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req)
        callback(response);
    },
    update: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (
            typeof req.body.id == 'undefined' ||
            typeof req.body.name == 'undefined' ||
            typeof req.body.lastname == 'undefined'
        ){
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            card.remove(req)
            return;                        
        }
        // Update participant
        var data = {
            $class : "org.hyperledger.composer.system.UpdateParticipant",
            targetRegistry : "resource:org.hyperledger.composer.system.ParticipantRegistry#org.example.empty.Administrador",
            resources : [{
                $class: "org.example.empty.Administrador",
                S: "Administrador",
                id: req.body.id,
                name: req.body.name,
                lastname: req.body.lastname
            }]
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
            card.remove(req)
            return;            
        }
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req)
        callback(response);
    },
    delete: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        if (typeof req.body.id == 'undefined') {
            response = '{"status":"fail", "message":"Missing ID Param" }'
            callback(response);
            card.remove(req)
            return;                        
        }
        var data = {
            $class : "org.hyperledger.composer.system.RemoveParticipant",
            targetRegistry : "resource:org.hyperledger.composer.system.ParticipantRegistry#org.example.empty.Administrador",
            resources : [],
            resourceIds: [req.body.id]
            }   
        data = JSON.stringify(data);
        data = "'" + data + "'";  
        // Delete the participant
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
            card.remove(req)
            return;            
        }
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req)
        callback(response);          
    }
}