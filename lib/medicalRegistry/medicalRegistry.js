var ipfsAPI = require('ipfs-api');
var fs = require('fs');
var config = require('../../appconfig.json');
var ipfs = ipfsAPI({host: config.ipfs["host"], port: config.ipfs["port"], protocol: config.ipfs["protocol"]});
var Files = require("../../format/getFiles");
var card = require("../cards");
var tar = require('../../format/tarOp');
var format = require('../../format/convert');
const shell = require('shelljs');
var expect = require('chai').expect

module.exports = {
    uploadRegistry: function(req,res,callback) {
        var response;
        // Import card
        if ( !card.importMf(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Check permissions
        if (!this.checkPermission(req)) {
            response = '{"status":"fail", "message":"Not valid card" }'
            callback(response); card.removeMf(req); return;
        }
        // Extract files
        tar.untar(req,function(bool){
            if ( !bool ) {
                response = '{"status":"fail", "message":"Untar failed" }'
                callback(response); card.removeMf(req); return;            
            }
            // UploadFiles
            data = Files.getFiles("./tmp/" + req.files.file[0].filename + "/");
            var result;
            ipfs.files.add(data,function(err,filesAdded){
                if (err) {
                    result = err;
                    callback(result);
                    card.removeMf(req); 
                    return;               
                }
                result = filesAdded;
                callback(result);
                card.removeMf(req);
                // Update Medical Registry
                            
            });
        });
    },

    downloadRegistry: function(req,res,callback){

    },

    checkPermission: function(req){
        var output, status;
        // Validate args
        if (typeof req.body.id == 'undefined') {
            return false;
        }
        // Execute command ~ composer network list -c {CARD}
        shell.exec("./lib/scripts/networkList.sh "+req.files.card[0].originalname);
        format.separate("./lib/tmp/" + req.files.card[0].originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            return false;
        }
        if ( typeof output.registries["org.example.empty.HistorialMedico"].assets == 'undefined' ){
            return false;
        }else{
            if (typeof output.registries["org.example.empty.HistorialMedico"].assets[req.body.id] == 'undefined') {
                return false;
            }else{
                output = JSON.stringify(output.registries["org.example.empty.HistorialMedico"].assets[req.body.id]);
            }
        }
        console.log(output.id);
        return true;
    }
}