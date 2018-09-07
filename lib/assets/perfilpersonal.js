var format = require('../../format/convert');
var config = require('../../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect



module.exports = {
    create: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        shell.exec("./lib/scripts/import.sh "+req.file.originalname + " " + config["uploadDir"] + req.file.filename);
        format.getStatus("./lib/tmp/" + req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            callback(response);
            shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
            return;
        }
        // Validate arguments
        if (typeof req.body.id == 'undefined' ||
            typeof req.body.name == 'undefined' ||
            typeof req.body.lastname == 'undefined' ||
            typeof req.body.email == 'undefined' ||
            typeof req.body.direction == 'undefined' ||
            typeof req.body.allergy == 'undefined' ||
            typeof req.body.bloodtype == 'undefined'
        ) {
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
            return;                        
        }
        var data = {
            $class : "org.hyperledger.composer.system.AddAsset",
            targetRegistry : "resource:org.hyperledger.composer.system.AssetRegistry#org.example.empty.PerfilPersonal",
            resources : [{
                $class: "org.example.empty.PerfilPersonal",
                id : req.body.id,
                nombre : req.body.name,
                apellido : req.body.lastname,
                email : req.body.email,
                dob : 0,
                direccion : req.body.direction,
                TipoSangre : req.body.bloodtype,
                Alergias : req.body.allergy}]
            }
        data = JSON.stringify(data);
        data = "'" + data + "'";
        console.log(data);
        // Create the asset
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
            shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
            return;            
        }
        response = '{"status":"success","message":"'+ output+'"}'
        shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
        callback(response);
    },
    getAll: function(req,res,callback) {
        var output, status,response;
        // Importing composer card
        shell.exec("./lib/scripts/import.sh "+req.file.originalname + " " + config["uploadDir"] + req.file.filename);
        format.getStatus("./lib/tmp/" + req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            callback(response);
            shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
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
            shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
            return;            
        }
        output = JSON.stringify(output.registries["org.example.empty.PerfilPersonal"]);
        response = '{"status":"success","message":"'+ output+'"}'
        shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
        callback(response);
    },

    getById: function(req,res,callback){

    },

    delete: function(req,res,callback) {

    },

    update: function(req,res,callback) {

    }
}