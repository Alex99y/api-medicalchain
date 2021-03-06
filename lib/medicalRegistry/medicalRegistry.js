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
        const pathName = "tmp/" + req.files.file[0].filename;
        // Validate args
        if ( typeof req.body.version == 'undefined' || typeof req.body.idRegistry == 'undefined'){
            response = '{"status":"fail", "message":"Missing params" }'
            callback(response); return;
        }
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
            // Upload Files to IPFS
            var data = Files.getFiles("./" + pathName + "/");
            ipfs.files.add(data,function(err,filesAdded){
                if (err) {
                    console.log (err); callback(err); card.removeMf(req); return;               
                }
                // Search path file
                var file,n = filesAdded.length
                for ( var i = 0; i < n; i++ ){
                    if (filesAdded[i].path == pathName){
                        file = filesAdded[i]; break;
                    }
                }
                // Update Medical Registry
                var data = {
                        $class: "org.example.empty.ModificarRegistroMedico",
                        registro: "resource:org.example.empty.HistorialMedico#"+req.body.idRegistry,
                        version : req.body.version,
                        newHash : file.hash
                    }
                data = JSON.stringify(data);
                data = "'" + data + "'";
                shell.exec("./lib/scripts/transactionSubmit.sh "+req.files.card[0].originalname+" " + data);
                format.getStatus("./lib/tmp/"+req.files.card[0].originalname, function(one,two){
                    output = one;
                    status = two;
                });
                try{
                    expect(status).to.be.equal("Command succeeded");
                }catch(error){
                    response = '{"status":"fail", "message":"'+ output + '" }';
                    callback(response); card.removeMf(req); return;            
                }
                response = '{"status":"success","message":"'+ output+'"}';
                callback(response);
                card.removeMf(req);
            });
        });
    },

    downloadRegistry: function(req,res,callback){
       var response;
        // Validate args
        if ( typeof req.body.idRegistry == 'undefined' ){
            response = '{"status":"fail", "message":"Missing param idRegistry" }'
            callback(response); return;
        }
        // Import card
        if ( !card.import(req)) {
            response = '{"status":"fail", "message":"Command failed" }'
            callback(response); return;
        }
        // Check permissions
        this.getRegistry(req, function(registry){
            if ( registry == null) {
                response = '{"status":"fail", "message":"Permission denied" }'
                callback(response); return;
            }
            // Download Registry from IPFS
            ipfs.files.get(registry.hash,function(err,files){
                if (err) {
                    response = '{"status":"fail", "message":"IPFS ERROR" }'; callback(response); return;
                }
                // Create folders and files
                var fd;
                for (var i=0;i<files.length;i++){
                    if ( typeof files[i].content == 'undefined' ){
                        fs.mkdirSync("tmp/" + files[i].path);
                    }else{
                        fd = fs.openSync("tmp/" + files[i].path,'w');
                        fs.writeSync(fd,"tmp/" + files[i].content,0,'binary');
                        fs.closeSync(fd);
                    }
                }
                // Compress file
                tar.tar( files[1].path, function(bool){
                    if (!bool) { 
                        callback('{"status":"fail", "message":"Compressing file error" }');
                    }else{
                        callback("tmp/" + files[1].path + ".tar");
                    }
                });
            });
        });

    },

    getRegistry: function(req,callback){
        var output, status;
        // Execute command ~ composer network list -c {CARD}
        shell.exec("./lib/scripts/networkList.sh "+req.file.originalname);
        format.separate("./lib/tmp/" + req.file.originalname, function(one,two){
            output = one;
            status = two;
        });
        try{
            expect(status).to.be.equal("Command succeeded");
        }catch(error){
            callback(null); return;
        }
        if ( typeof output.registries["org.example.empty.HistorialMedico"].assets == 'undefined' ){
            callback(null); return;
        }else{
            if (typeof output.registries["org.example.empty.HistorialMedico"].assets[req.body.idRegistry] == 'undefined') {
                callback(null); return;
            }else{
                output = output.registries["org.example.empty.HistorialMedico"].assets[req.body.idRegistry];
            }
        }
        callback(output);
    },
    checkPermission: function(req) {
        var output, status;
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
            if (typeof output.registries["org.example.empty.HistorialMedico"].assets[req.body.idRegistry] == 'undefined') {
                return false;
            }else{
                output = JSON.stringify(output.registries["org.example.empty.HistorialMedico"].assets[req.body.idRegistry]);
            }
        }
        return true;
    }
}