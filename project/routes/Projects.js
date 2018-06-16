var express = require('express');
var router = express.Router();
var ProjectController = require('../controllers/ProjectController');
const Project = require('../models/Project');


router.get('/searchProject', function(req, res, next) {
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

router.post('/create',(req, res) => {
    console.log(req.body);
    ProjectController.createProject(req.body)
            .then(data => {
                res.status(data.status).send({success: data.success, data: data.message});
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
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

router.delete('/deleteProject', (req, res) => {
    console.log(req.param('id'));
    const id = req.param('id');
    ProjectController.deleteProject(id).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

module.exports = router;