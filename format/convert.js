YAML = require('yamljs');

module.exports = {
    separate: function(input, callback){
        var status = input.slice(input.lastIndexOf('\n') + 1);
        var subString = input.substring(0, input.lastIndexOf("\n"));
        var output = YAML.parse(subString);
        callback(output,status);
    }
}