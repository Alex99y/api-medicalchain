var expect = require('chai').expect
var fs = require("fs");
var format = require('../format/convert');

// | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g"

// First test

var input = './test/files/example01.in';
var status,output;
format.separate(input, 
    function(one,two){
        output = one;
        status = two;
    });
expect(output.registries["org.example.empty.Paciente"].name).to.be.equal("Participant registry for org.example.empty.Paciente")
expect(status).to.be.equal("Command succeeded");

