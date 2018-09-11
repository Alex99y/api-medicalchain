const fs = require('fs');

module.exports = {
    getFiles: function(path){
        var dir = fs.readdirSync(path);
        var files = [];
        var file = {};
        file.path=path;
        file.dir = true;
        if ( file != {}){
            files.push(file);
        }
        for (var i = 0; i < dir.length; i++ ) {
            file = {};
            if (fs.statSync(path + dir[i]).isDirectory()) {
                var files2 = this.getFiles(path + dir[i] + "/");
                files = files2.concat(files);
            }else{
                file.path = path + dir[i];
                file.content = new Buffer(fs.readFileSync(file.path,"binary"));
                files.push(file);
            }
        }
        return files;
    }
}