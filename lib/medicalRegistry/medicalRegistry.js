var ipfsAPI = require('ipfs-api');
var fs = require('fs');
var config = require('../../appconfig.json');
var ipfs = ipfsAPI({host: config.ipfs["host"], port: config.ipfs["port"], protocol: config.ipfs["protocol"]});

module.exports = {
    uploadRegistry: function(req,res,callback) {
    
    data = [
        {
            path: "./Uploads/",
            dir: true
        },
        {   path: "./Uploads/" + req.files.file[0].filename,
            content: new Buffer("")
        }
    ]
    data[1].content = new Buffer(fs.readFileSync(data[1].path,"binary"));
    console.log(data);
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