var ipfsAPI = require('ipfs-api');
var fs = require('fs');
var config = require('../../appconfig.json');
var ipfs = ipfsAPI({host: config.ipfs["host"], port: config.ipfs["port"], protocol: config.ipfs["protocol"]});
var Files = require("../../format/getFiles");
var path = require('path');

module.exports = {
    uploadRegistry: function(req,res,callback) {
        data = Files.getFiles("./lib/");
        var result;
        ipfs.files.add(data)
        .then( (filesAdded) => {
            result = filesAdded;
            callback(result);
        })
        .catch( (err) => {
            result = err;
            callback(result);
        });  
    },
    downloadRegistry: function(req,res,callback){

    }
}