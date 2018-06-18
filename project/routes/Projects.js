var express = require('express');
var router = express.Router();
var ProjectController = require('../controllers/ProjectController');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

const jwtSecret = 'keyforjwt';

router.get('/searchProject', function(req, res, next) {
   // console.log(req.headers);
    //var token = req.headers['x-access-token'];
  //  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  //   console.log(token);
    // jwt.verify(token,jwtSecret).then((error,decoded) => {
    //     if(error){
    //         console.log("error " +error);
    //     }
    //     console.log(decoded);
    // });

    ProjectController.showProjects()
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name: data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
});

router.get('/Project', function(req, res, next) {
    const Pid = req.param('id');
    ProjectController.individualProjects(Pid)
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name: data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
});

router.get('/ProjectByUser', function(req, res, next) {
    const Uid = req.param('id');
    ProjectController.getUsersProjects(Uid)
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name: data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
});
router.get('/allUserProjects', function (req, res) {
    const Uid = req.param('id');
    ProjectController.getAllUserProjects(Uid)
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name: data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
});

router.post('/create',(req, res) => {
    console.log(req.body);
    ProjectController.createProject(req.body)
            .then(data => {
                res.status(data.status).send({success: data.success, message: data.message, data:data.data});
            })
            .catch((error) => {
                console.log(error);
                res.status(error.status).send({errors: error.errors, message: "error " + error.message});
            })
});

router.put('/editProject', (req, res) => {
    console.log(req.param('id'));
    const id = req.param('id');
    ProjectController.editProject(id, req.body).then(data => {
        res.status(data.status).send({success:true ,message: data.message});
    }).catch(err => {
        res.status(err.status).send({success:false ,message: err.message});
    })
});

router.delete('/deleteProject', (req, res) => {
    // console.log(req.param('id'));
    const id = req.param('id');
    console.log(id);
    ProjectController.deleteProject(id).then(data => {
        res.status(data.status).send({success:true ,message: data.message});
    }).catch(err => {
        res.status(err.status).send({success:false ,message: err.message});
    })
});

module.exports = router;