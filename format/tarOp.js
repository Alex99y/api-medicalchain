var tar = require('tar-fs');
var fs = require('fs');
var config = require('../appconfig.json');
var unzip = require('unzip');
var shell = require('shelljs');
module.exports = {
    untar: function(req,callback) {
        var tarFile = config["uploadDir"] + req.files.file[0].filename;
        var untarFile = "./tmp/"+ req.files.file[0].filename;
        try {
            fs.createReadStream(tarFile)
            .pipe(tar.extract(untarFile))
            .on("finish",()=>{ callback(true); });
        }catch (err){
            console.log(err);
            callback(false);
        }
    },
    tar: function(req) {

    },
    unzip: function(filename, callback) {
        try {
            fs.createReadStream(config["uploadDir"]+filename)
            .pipe(unzip.Extract({ path: './tmp/'+filename }))
            .on('close',()=>{
                callback(true);
            });
        }catch(err){callback(false);}
    }
}