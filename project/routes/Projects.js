var express = require('express');
var router = express.Router();
var { check, validationResult } = require("express-validator/check");
var ProjectController = require('../controllers/ProjectController');
const Project = require('../models/Project');


router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    ProjectController.showProjects()
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name:data.name});
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

module.exports = router;