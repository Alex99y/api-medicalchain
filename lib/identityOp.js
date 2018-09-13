var format = require('../format/convert');
const config = require('../appconfig.json');
const shell = require('shelljs');
var expect = require('chai').expect


module.exports = {

    // Create Card
    createCard: function(originalname) {
        // Request identity
        var response = {};
        if (typeof originalname == 'undefined' ) { response.status = "fail"; response.message = "Missing param name"; return response;}
        if (!this.requestIdentity(originalname)){
            response.status = "fail"; response.message = "Error, cannot request identity, try again in few seconds"; return response;
        }
        // Create card
        shell.exec("./lib/scripts/cardCreate.sh "+originalname+" "+config["profile"]+" ./identityFiles/"+originalname+"/admin-pub.pem "+"./identityFiles/"+originalname+"/admin-priv.pem");
        format.getStatus("./lib/tmp/"+originalname,function(o,t){ output = o; status = t;});
        try{ expect(status).to.be.equal("Command succeeded");
        }catch(error){ response.status = status; response.message = output; return response; }
        // Return
        response.status = status; response.message = output; return response;
    },

    // Identity Request
    requestIdentity: function(originalname) {
        var output, status;
        shell.exec("./lib/scripts/requestIdentity.sh "+originalname);
        format.getStatus("./lib/tmp/"+originalname,function(o,t){ output = o; status = t;});
        try{ expect(status).to.be.equal("Command succeeded");
        }catch(error){ return false; }
        return true;
    },

    // Identity Bind
    bindIdentity: function(name, type, id,callback) {
        var response = {};
        var cert = "./tmp/"+name+"/credentials/certificate"
        var participant = "org.example.empty."+type+"#"+id;
        shell.exec("./lib/scripts/identityBind.sh "+participant+" "+cert+" "+name);
        format.getStatus("./lib/tmp/"+name,function(o,t){ output = o; status = t;});
        try{ expect(status).to.be.equal("Command succeeded");
        }catch(error){ 
            response.status = "fail", response.message = output;
            callback(response); return;
        }
        response.status = "success"; response.message = output;
        callback(response); return;
    }
}