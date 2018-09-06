YAML = require('yamljs');
var fs = require('fs');

//Production environment should use readFile() with callback

module.exports = {
    separate: function(input, callback){
        input = fs.readFileSync(input, 'ascii');
        // Removes last 2 end of line
        var subString = input.substring(0, input.lastIndexOf("\n"));
        subString = subString.substring(0, subString.lastIndexOf("\n"));
        // Extract request status from the string
        var status = subString.slice(subString.lastIndexOf('\n') + 1);
        // Remove request status from the string
        subString = subString.substring(0, subString.lastIndexOf("\n"));
        // Parse
        var output = YAML.parse(subString);
        callback(output,status);
    },
    getStatus: function (input, callback) {
        input = fs.readFileSync(input, 'ascii');
        // Removes last 2 end of line
        var subString = input.substring(0, input.lastIndexOf("\n"));
        subString = subString.substring(0, subString.lastIndexOf("\n"));
        // Extract request status from the string
        var status = subString.slice(subString.lastIndexOf('\n') + 1);
        // Remove request status from the string
        subString = subString.substring(0, subString.lastIndexOf("\n"));
        subString = subString.replace(/(\r\n\t|\n|\r\t|\t)/gm,"");
        callback(subString,status);
    }
}