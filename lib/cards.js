var format = require('../format/convert');
var config = require('../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect


module.exports = {

    init: function(){
        var output, status;
        // Importing composer card
        shell.exec("./lib/scripts/import.sh ADMIN " + config["adminCard"]);
        format.getStatus("./lib/tmp/ADMIN", function(o,t){ output = o; status = t; });
        try{
            expect(status).to.be.equal("Command succeeded"); return true;
        }catch(error){
            console.log(output); shell.exec("./lib/scripts/delete.sh ADMIN"); return false;
        }        
    },

    import: function(req) {
        var output, status;
        // Importing composer card
        shell.exec("./lib/scripts/import.sh "+req.file.originalname + " " + config["uploadDir"] + req.file.filename);
        format.getStatus("./lib/tmp/" + req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
            return true;
        }catch(error){
            this.remove(req);
            return false;
        }
    },

    importMf: function(req) {
        var output, status;
        // Importing composer card
        shell.exec("./lib/scripts/import.sh "+req.files.card[0].originalname + " " + config["uploadDir"] + req.files.card[0].filename);
        format.getStatus("./lib/tmp/" + req.files.card[0].originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
            return true;
        }catch(error){
            this.removeMf(req);
            return false;
        }
    },
    remove: function(req) {
        shell.exec("./lib/scripts/delete.sh "+req.file.originalname);
    },
    removeMf: function(req){
        shell.exec("./lib/scripts/delete.sh "+req.files.card[0].originalname);
    }
}