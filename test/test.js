var expect = require('chai').expect
var assert = require('assert');
var config = require('../appconfig.json');
var fs = require('fs');
const randomId = (Math.random() *100000000000000000).toString();


let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url= config.host + ":" + config.port;

/* Admin operation */
describe('Admin', function() {
  describe('Create an Admin', function() {
    it('Should create a new Admin', function() {
        chai.request(url)
            .post('/participant/createAdmin')
            .type('multipart/form-data')
            .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
            .send(JSON.stringify( { id: randomId, name: "test", lastname: "test"} ))
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
            });
    });
  });
  describe('Get Admins', function() {
    it('Should get all Admins', function() {
      assert.equal([1,2,3].indexOf(20), -1);
    });
  });
  describe('Get an Admin by id', function() {
    it('Should get an Admin by id', function() {
      var u =" 0";
      expect(u).to.be.a('string');
    });
  });
  describe('Update Admin', function() {
    it('Should update an Admin', function() {
      var u =" 0";
      expect(u).to.be.a('string');
    });
  });
  describe('Delete Admin', function() {
    it('Should delete and Admin', function() {
      var u =" 0";
      expect(u).to.be.a('string');
    });
  });
});

