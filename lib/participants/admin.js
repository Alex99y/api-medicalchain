var format = require('../../format/convert');
var config = require('../../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect
var fs = require('fs');

module.exports = {
    create: function(req,callback) {
        // req.file.originalname
        // config["uploadDir"] 
        // req.file.filename
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
        // Create Admin
        if (typeof req.body.id == 'undefined' || typeof req.body.name == 'undefined' || typeof req.body.lastname == 'undefined') {
            response = '{"status":"fail", "message":"Missing Params" }'
            callback(response);
            shell.exec("./lib/scripts/delete.sh "+req.file.originalname+ " " + config["uploadDir"] + req.file.filename);
            return;                        
        }
        shell.exec("./lib/scripts/createAdmin.sh " + req.file.originalname + " " + req.body.id + " " + req.body.name + " " + req.body.lastname);
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
        callback(response)
    },

    update: function(req,res,callback) {

    },

    read: function(req,res,callback){

    },
    delete: function(req,res,callback){

    }
}