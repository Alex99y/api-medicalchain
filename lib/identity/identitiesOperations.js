var format = require('../../format/convert');
var config = require('../../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect
var fs = require('fs');
var card = require("../cards");

module.exports = {
    issueIdentity: function(req,res,callback){
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Validate arguments
        if (
            typeof req.body.id == 'undefined' ||
            typeof req.body.type == 'undefined' ||
            typeof req.body.name == 'undefined'
        ){
            response = '{"status":"fail", "message":"Missing Params" }'
            res.send(response);
            callback();
            card.remove(req);
            return;                        
        }
        // Identity issue
        var a,x,u;
        if (req.body.type == "Administrador" ) { x = "true" } else { x = "false" }
        u = req.body.name;
        a = "org.example.empty."+req.body.type+"#"+req.body.id;
        shell.exec("./lib/scripts/identityIssue.sh "+req.file.originalname+" "+a+" "+u+" "+x+" ./cards/"+u+".card");
        // Send identity
        format.getStatus("./lib/tmp/"+req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            response = '{"status":"fail", "message":"'+ output + '" }'
            res.send(response);
            callback();
            card.remove(req);
            return;            
        }
        // https://github.com/postmanlabs/postman-app-support/issues/2082
        res.setHeader("content-type", "file");
        res.setHeader("Content-Disposition", "attachment");
        res.setHeader("filename",req.body.name+".card");
        fs.createReadStream("./cards/"+ req.body.name +".card").pipe(res);
        card.remove(req);
    }
    // list: function(req,res,callback){
    //     var output, status,response;
    //     // Importing composer card
    //     shell.exec("./lib/scripts/import.sh "+req.file.originalname + " " + config["uploadDir"] + req.file.filename);
    //     format.getStatus("./lib/tmp/" + req.file.originalname, function(one,two){
    //         output = one;
    //         status = two;
    //     });
    //     try{
    //         expect(status).to.be.equal("Command succeeded");
    //     }catch(error){
    //         response = '{"status":"fail", "message":"'+ output + '" }'
    //         callback(response);
    //         card.remove(req);
    //         return;
    //     }
    //     // composer identity list -c $1
    //     shell.exec("./lib/scripts/identityList.sh "+req.file.originalname);
    //     format.separate("./lib/tmp/" + req.file.originalname, function(one,two){
    //         output = one;
    //         status = two;
    //     });
    //     try{
    //         expect(status).to.be.equal("Command succeeded");
    //     }catch(error){
    //         response = '{"status":"fail", "message":"'+ output + '" }'
    //         callback(response);
    //         card.remove(req);
    //         return;            
    //     }
    //     if ( typeof output.registries["org.example.empty.Administrador"].assets == 'undefined' ){
    //         output = "{}";
    //     }else{
    //         output = JSON.stringify(output.registries["org.example.empty.Administrador"].assets);
    //     }
    //     response = '{"status":"success","message":"'+ output+'"}'
    //     card.remove(req);
    //     callback(response); 
    // },
}