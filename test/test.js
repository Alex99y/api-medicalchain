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
//   this.timeout(60000);
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

// /* PerfilPersonal operation */
// describe('PerfilPersonal', function() {
//     this.timeout(60000);
//     describe('Create PerfilPersonal', function() {
//         it('Should create new PerfilPersonal', function() {
//             return chai.request(url)
//                 .post('/asset/createPerfilPersonal')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .field("id",randomId)
//                 .field("name","test")
//                 .field("lastname","test")
//                 .field("email","test")
//                 .field("direction","test")
//                 .field("date",0)
//                 .field("allergy","test")
//                 .field("donor","test")
//                 .field("bloodtype","test")
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });
//         });
//     });
//     describe('Get all PerfilPersonal', function() {
//         it('Should get all PerfilPersonal', function() {
//             return chai.request(url)
//                 .post('/asset/getPerfilPersonal')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });      
//         });
//     });
//     describe('Get one PerfilPersonal by id', function() {
//         it('Should get one PerfilPersonal by id', function() {
//             return chai.request(url)
//             .post('/asset/getPerfilPersonalById')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });     
//         });
//     });
//     describe('Update PerfilPersonal', function() {
//         it('Should update PerfilPersonal', function() {
//             return chai.request(url)
//                 .post('/asset/updatePerfilPersonal')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .field("id",randomId)
//                 .field("name","test")
//                 .field("lastname","test")
//                 .field("email","test")
//                 .field("direction","test")
//                 .field("date",0)
//                 .field("allergy","test")
//                 .field("donor","test")
//                 .field("bloodtype","test")
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });
//         });
//     });
//     describe('Delete PerfilPersonal', function() {
//         it('Should delete PerfilPersonal', function() {
//             return chai.request(url)
//             .post('/asset/deletePerfilPersonal')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             }); 
//         });
//     });
// });

// /* PerfilPublico operation */
// describe('PerfilPublico', function() {
//     this.timeout(60000);
//     describe('Create PerfilPublico', function() {
//         it('Should create new PerfilPublico', function() {
//             return chai.request(url)
//                 .post('/asset/createPerfilPublico')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .field("id",randomId)
//                 .field("name","test")
//                 .field("lastname","test")
//                 .field("email","test")
//                 .field("direction","test")
//                 .field("date",0)
//                 .field("license","test")
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });
//         });
//     });
//     describe('Get all PerfilPublico', function() {
//         it('Should get all PerfilPublico', function() {
//             return chai.request(url)
//                 .post('/asset/getPerfilPublico')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });      
//         });
//     });
//     describe('Get one PerfilPublico by id', function() {
//         it('Should get one PerfilPublico by id', function() {
//             return chai.request(url)
//             .post('/asset/getPerfilPublicoById')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });     
//         });
//     });
//     describe('Update PerfilPublico', function() {
//         it('Should update PerfilPublico', function() {
//             return chai.request(url)
//                 .post('/asset/updatePerfilPublico')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .field("id",randomId)
//                 .field("name","test")
//                 .field("lastname","test")
//                 .field("email","test")
//                 .field("direction","test")
//                 .field("date",0)
//                 .field("license","test")
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });
//         });
//     });
//     describe('Delete PerfilPublico', function() {
//         it('Should delete PerfilPublico', function() {
//             return chai.request(url)
//             .post('/asset/deletePerfilPublico')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             }); 
//         });
//     });
// });

// /* HistorialMedico operation */
// describe('HistorialMedico', function() {
//     this.timeout(60000);
//     describe('Create HistorialMedico', function() {
//         it('Should create new HistorialMedico', function() {
//             return chai.request(url)
//                 .post('/asset/createHistorialMedico')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .field("idRegistry",randomId)
//                 .field("idPatient",randomId)
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });
//         });
//     });
//     describe('Get all HistorialMedico', function() {
//         it('Should get all HistorialMedico', function() {
//             return chai.request(url)
//                 .post('/asset/getHistorialMedico')
//                 .type('multipart/form-data')
//                 .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//                 .then( function(res){
//                     expect(res.status).to.be.equal(200);
//                 }).catch(function(err){
//                     throw err;
//                 });      
//         });
//     });
//     describe('Get one HistorialMedico by id', function() {
//         it('Should get one HistorialMedico by id', function() {
//             return chai.request(url)
//             .post('/asset/getHistorialMedicoById')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });     
//         });
//     });
//     describe('Delete HistorialMedico', function() {
//         it('Should delete HistorialMedico', function() {
//             return chai.request(url)
//             .post('/asset/deleteHistorialMedico')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("id",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             }); 
//         });
//     });
// });
// /* Patient operation */
// describe('Patient', function() {
//   this.timeout(60000);
//   describe('Create Patient', function() {
//     it('Should create a new Patient', function() {
//         return chai.request(url)
//             .post('/participant/createPatient')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("idRegistry",randomId)
//             .field("idPatient",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });
//     });
// });
//   describe('Get Patients', function() {
//     it('Should get all Patients', function() {
//         return chai.request(url)
//             .post('/participant/getPatients')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });      
//     });
//   });
//   describe('Get Patient by id', function() {
//     it('Should get Patient by id', function() {
//         return chai.request(url)
//             .post('/participant/getPatients')
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
//   describe('Update Patient', function() {
//     it('Should update Patient', function() {
//         return chai.request(url)
//             .post('/participant/updatePatient')
//             .type('multipart/form-data')
//             .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
//             .field("idRegistry",randomId)
//             .field("idPatient",randomId)
//             .then( function(res){
//                 expect(res.status).to.be.equal(200);
//             }).catch(function(err){
//                 throw err;
//             });
//     });
//   });
//   describe('Delete Patient', function() {
//     it('Should delete Patient', function() {
//         return chai.request(url)
//             .post('/participant/deletePatient')
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
/* Doctor operation */
describe('Doctor', function() {
    this.timeout(60000);
    describe('Create Doctor', function() {
      it('Should create a new Doctor', function() {
          return chai.request(url)
              .post('/participant/createDoctor')
              .type('multipart/form-data')
              .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
              .field("idRegistry",randomId)
              .field("idDoctor",randomId)
              .then( function(res){
                  expect(res.status).to.be.equal(200);
              }).catch(function(err){
                  throw err;
              });
      });
  });
    describe('Get Doctors', function() {
      it('Should get all Doctors', function() {
          return chai.request(url)
              .post('/participant/getDoctors')
              .type('multipart/form-data')
              .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
              .then( function(res){
                  expect(res.status).to.be.equal(200);
              }).catch(function(err){
                  throw err;
              });      
      });
    });
    describe('Get Doctor by id', function() {
      it('Should get Doctor by id', function() {
          return chai.request(url)
              .post('/participant/getDoctors')
              .type('multipart/form-data')
              .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
              .field("id",randomId)
              .then( function(res){
                  expect(res.status).to.be.equal(200);
              }).catch(function(err){
                  throw err;
              }); 
      });
    });
    describe('Update Doctor', function() {
      it('Should update Doctor', function() {
          return chai.request(url)
              .post('/participant/updateDoctor')
              .type('multipart/form-data')
              .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
              .field("idRegistry",randomId)
              .field("idDoctor",randomId)
              .then( function(res){
                  expect(res.status).to.be.equal(200);
              }).catch(function(err){
                  throw err;
              });
      });
    });
    describe('Delete Doctor', function() {
      it('Should delete Doctor', function() {
          return chai.request(url)
              .post('/participant/deleteDoctor')
              .type('multipart/form-data')
              .attach('card', fs.readFileSync('./info/clinica/ClinicaAdmin@basic-sample-network.card'), 'test.card')
              .field("id",randomId)
              .then( function(res){
                  expect(res.status).to.be.equal(200);
              }).catch(function(err){
                  throw err;
              }); 
      });
    });
  });
