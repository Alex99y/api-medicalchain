var format = require('../../format/convert');
var config = require('../../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect
var card = require('../cards');


module.exports = {
    create: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (typeof req.body.id == 'undefined' ||
            typeof req.body.name == 'undefined' ||
            typeof req.body.lastname == 'undefined' ||
            typeof req.body.date == 'undefined' ||
            typeof req.body.email == 'undefined' ||
            typeof req.body.direction == 'undefined' ||
            typeof req.body.allergy == 'undefined' ||
            typeof req.body.bloodtype == 'undefined' ||
            typeof req.body.donor == 'undefined'
        ) {
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            card.remove(req);
            return;                        
        }
        var data = {
            $class : "org.hyperledger.composer.system.AddAsset",
            targetRegistry : "org.hyperledger.composer.system.AssetRegistry#org.example.empty.PerfilPersonal",
            resources : [{
                $class: "org.example.empty.PerfilPersonal",
                id : req.body.id,
                nombre : req.body.name,
                apellido : req.body.lastname,
                email : req.body.email,
                dob : (req.body.date).toString(),
                direccion : req.body.direction,
                TipoSangre : req.body.bloodtype,
                Alergias : req.body.allergy,
                Donante : req.body.donor}]
            }
        data = JSON.stringify(data);
        data = "'" + data + "'";
        // Create the asset
        shell.exec("./lib/scripts/transactionSubmit2.sh "+req.file.originalname+" "+data);
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
    getAll: function(req,res,callback) {
        var output, status,response;
        // Importing composer card
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
            response = '{"status":"fail", "message":"'+ JSON.stringify(output) + '" }'
            callback(response);
            card.remove(req);
            return;            
        }
        if ( typeof output.registries["org.example.empty.PerfilPersonal"].assets == 'undefined' ){
            output = "{}";
        }else{
            output = JSON.stringify(output.registries["org.example.empty.PerfilPersonal"].assets);
        }
        response = '{"status":"success","message":'+ output+'}'
        card.remove(req);
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
            card.remove(req);
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
            response = '{"status":"fail", "message":'+ JSON.stringify(output) + '}'
            callback(response);
            card.remove(req);
            return;            
        }
        if ( typeof output.registries["org.example.empty.PerfilPersonal"].assets == 'undefined' ){
            output = "{}";
        }else{
            if (typeof output.registries["org.example.empty.PerfilPersonal"].assets[req.body.id] == 'undefined') {
                output = "{}";
            }else{
            output = JSON.stringify(output.registries["org.example.empty.PerfilPersonal"].assets[req.body.id]);
            }
        }
        response = '{"status":"success","message":'+ output+'}'
        card.remove(req);
        callback(response);
    },

    delete: function(req,res,callback) {
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        if (typeof req.body.id == 'undefined') {
            response = '{"status":"fail", "message":"Missing ID Param" }'
            callback(response);
            card.remove(req);
            return;                        
        }
        var data = {
            $class : "org.hyperledger.composer.system.RemoveAsset",
            targetRegistry : "resource:org.hyperledger.composer.system.AssetRegistry#org.example.empty.PerfilPersonal",
            resources : [],
            resourceIds: [req.body.id]
            }   
        data = JSON.stringify(data);
        data = "'" + data + "'";  
        // Delete the asset
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

    update: function(req,res,callback) {
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (typeof req.body.id == 'undefined' ||
            typeof req.body.name == 'undefined' ||
            typeof req.body.lastname == 'undefined' ||
            typeof req.body.date == 'undefined' ||
            typeof req.body.email == 'undefined' ||
            typeof req.body.direction == 'undefined' ||
            typeof req.body.allergy == 'undefined' ||
            typeof req.body.bloodtype == 'undefined' ||
            typeof req.body.donor == 'undefined'
        ) {
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            card.remove(req);
            return;                        
        }
        // Update asset
        var data = {
            $class : "org.hyperledger.composer.system.UpdateAsset",
            targetRegistry : "resource:org.hyperledger.composer.system.AssetRegistry#org.example.empty.PerfilPersonal",
            resources : [{
                $class: "org.example.empty.PerfilPersonal",
                id : req.body.id,
                nombre : req.body.name,
                apellido : req.body.lastname,
                email : req.body.email,
                dob : req.body.date,
                direccion : req.body.direction,
                TipoSangre : req.body.bloodtype,
                Alergias : req.body.allergy,
                Donante : req.body.donor}]
            }
        data = JSON.stringify(data);
        data = "'" + data + "'";
        // Create the asset
        shell.exec("./lib/scripts/transactionSubmit2.sh "+req.file.originalname+" " + data);
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
