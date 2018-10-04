var expect = require('chai').expect
var should = require('chai').should
var assert = require('assert');
var config = require('../appconfig.json');
var fs = require('fs');
const randomId = (Math.random() *100000000000000000).toString();


let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url= config.host + ":" + config.port;

// /* Admin operation */
// describe('Admin', function() {
//   this.timeout(50000);
//   describe('Create an Admin', function() {
//     it('Should create a new Admin', function() {
//         return chai.request(url)
//             .post('/participant/createAdmin')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .field("name","test")
//             .field("lastname","test")
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });
//     });
// });
//   describe('Get Admins', function() {
//     it('Should get all Admins', function() {
//         return chai.request(url)
//             .post('/participant/getAdmins')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });      
//     });
//   });
//   describe('Get an Admin by id', function() {
//     it('Should get an Admin by id', function() {
//         return chai.request(url)
//             .post('/participant/getAdmins')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             }); 
//     });
//   });
//   describe('Update Admin', function() {
//     it('Should update an Admin', function() {
//         return chai.request(url)
//             .post('/participant/updateAdmin')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .field("name","test")
//             .field("lastname","test")
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });
//     });
//   });
//   describe('Delete Admin', function() {
//     it('Should delete and Admin', function() {
//         return chai.request(url)
//             .post('/participant/deleteAdmin')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             }); 
//     });
//   });
// });

/* PerfilPersonal operation */
describe('PerfilPersonal', function() {
    this.timeout(50000);
    describe('Create PerfilPersonal', function() {
        it('Should create PerfilPersonal', function() {
        
        });
    });
    describe('Get all PerfilPersonal', function() {
        it('Should get all PerfilPersonal', function() {
        
        });
    });
    describe('Get one PerfilPersonal by id', function() {
        it('Should get one PerfilPersonal by id', function() {
        
        });
    });
    describe('Update PerfilPersonal', function() {
        it('Should update PerfilPersonal', function() {
        
        });
    });
    describe('Delete PerfilPersonal', function() {
        it('Should delete PerfilPersonal', function() {
        
        });
    });
});