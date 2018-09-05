var expect = require('chai').expect
var fs = require("fs");

// First test
var format = require('../format/convert');
var input = fs.readFileSync('./test/files/example01.in','utf8');
var status,output;
format.separate(input, 
    function(one,two){
        output = one;
        status = two;
    });
expect(output.registries["org.example.empty.Paciente"].name).to.be.equal("Participant registry for org.example.empty.Paciente")
expect(status).to.be.equal("Command succeeded");
