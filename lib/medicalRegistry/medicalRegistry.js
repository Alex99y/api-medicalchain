var ipfsAPI = require('ipfs-api');
var fs = require('fs');
var config = require('../../appconfig.json');
var ipfs = ipfsAPI({host: config.ipfs["host"], port: config.ipfs["port"], protocol: config.ipfs["protocol"]});
var Files = require("../../format/getFiles");
var card = require("../cards");

module.exports = {
    uploadRegistry: function(req,res,callback) {
        // Import card
        if ( !card.importMf(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }

        // UploadFiles
        data = Files.getFiles("./lib/");
        var result;
        ipfs.files.add(data)
        .then( (filesAdded) => {
            result = filesAdded;
            callback(result);
            card.removeMf(req);
        })
        .catch( (err) => {
            result = err;
            callback(result);
            card.removeMf(req);
        });  
    },
    downloadRegistry: function(req,res,callback){

    }
}