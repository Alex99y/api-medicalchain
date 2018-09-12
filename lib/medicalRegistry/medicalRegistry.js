var ipfsAPI = require('ipfs-api');
var fs = require('fs');
var config = require('../../appconfig.json');
var ipfs = ipfsAPI({host: config.ipfs["host"], port: config.ipfs["port"], protocol: config.ipfs["protocol"]});
var Files = require("../../format/getFiles");
var card = require("../cards");
var tar = require('../../format/tarOp');

module.exports = {
    uploadRegistry: function(req,res,callback) {
        var response;
        // Import card
        if ( !card.importMf(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Check permissions

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
            });
        });
    },
    downloadRegistry: function(req,res,callback){

    }
}