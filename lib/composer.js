var format = require('../format/convert');
var config = require('../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect
var card = require("./cards");

module.exports = {
    ping: function(req,res, callback) {
        var output, status,response;
        // Importing composer card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Ping! 
        shell.exec("./lib/scripts/ping.sh "+req.file.originalname);
        format.getStatus("./lib/tmp/" + req.file.originalname, function(one,two){
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
        // Delete composer card
        response = '{"status":"success","message":"'+ output+'"}'
        card.remove(req);
        callback(response)
    }

    
}

