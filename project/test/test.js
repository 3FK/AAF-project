const assert = require('chai').assert;
const config = require('../config/myProject');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

// let should = chai.should();
let expect = chai.expect;

// note: all parameters are hard coded

//user testing
it('post method to user registration' , function(done){
    chai.request('http://localhost:3001/user')
        .post('/signUp')
        .send({
            "firstname":"unit",
            "lastname":"tester",
            "username":"unitTester",
            "email":"unittester@test.com" ,
            "password":"testunit123",
            "country":"japan",
            "description":"i test system units"
        })
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});
//edit user
it('put method to update user details' , function(done){
    chai.request('http://localhost:3001/user')
        .put('/editUser?id=5b27edbf33f296372cb98548')
        .send({
            "firstname":"unit",
            "lastname":"tester",
            "username":"unitTester404",
            "email":"unittester@test.com" ,
            "country":"japan",
            "description":"i test system units"
        })
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});
//login user
it('post method to user login' , function(done){
    chai.request('http://localhost:3001/user')
        .post('/logIn')
        .send({
            "email":"unittester@test.com" ,
            "password":"testunit123"
        })
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});
//delete user
it('delete method to delete user' , function(done){
    chai.request('http://localhost:3001/user')
        .delete('/deleteUser?id=5b27edbf33f296372cb98548')
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});


//project testing
//test add projects
it('post method to create project' , function(done){
    chai.request('http://localhost:3001/project')
        .post('/create')
        .send({
            "projectName":"testProject",
            "projectDescription":"test system",
            "DueDate":"2018-06-18",
            "projectOwner":"5b25564542244f488c842031" ,
            "Private":false,
            "projectField":["node","react"],
            "Collaborators":[]
        })
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});

//test get projects
it('get method to retrieve all public projects', (done) => {
    chai.request('http://localhost:3001/project')
        .get('/searchProject')
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
});
//get individual projects
it('get method to retrieve individual projects', (done) => {
    chai.request('http://localhost:3001/project')
        .get('/Project?id=5b27e6aa31b35305ac1ee12e')
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
});
//get all projects of one user
it('get method to retrieve all projects of one user', (done) => {
    chai.request('http://localhost:3001/project')
        .get('/allUserProjects?id=5b25564542244f488c842031')
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
});

//test update project
it('put method to update project' , function(done){
    chai.request('http://localhost:3001/project')
        .put('/editProject?id=5b27e32f485c221ecc983088')
        .send({
            "projectName":"test Project",
            "projectDescription":"test success",
            "DueDate":"2018-06-18",
            "projectOwner":"5b25564542244f488c842031" ,
            "Private":false,
            "projectField":["node","react"],
            "Collaborators":[]

        })
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});

//test delete project
it('delete method to delete project' , function(done){
    chai.request('http://localhost:3001/project')
        .delete('/deleteProject?id=5b27e32f485c221ecc983088')
        .end(function(err, res){
            expect(res.statusCode).to.equal(200);
            done();
        });
});