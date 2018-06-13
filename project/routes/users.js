var express = require('express');
var router = express.Router();
var { check, validationResult } = require("express-validator/check");
var userController = require('../controllers/UserController');
const User = require('../models/User');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  // res.send('respond with a resource');
    userController.showUsers()
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name:data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
});

// validation source:https://github.com/tahaygun/MERN-youtube/blob/master/server/controller.js

const signUpValidation = [
    check("firstname")
        .not()
        .isEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("Name should be at least 2 letters")
        .matches(/^([A-z]|\s)+$/)
        .withMessage("Name cannot have numbers"),
    check("lastname")
        .not()
        .isEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name should be at least 2 letters"),
    check("username")
        .not()
        .isEmpty()
        .withMessage("Username is required")
        .isLength({ min: 2 })
        .withMessage("Username should be at least 2 letters"),
    check("username").custom(value => {
        return User.findOne({ username: value }).then(function(user) {
            if (user) {
                throw new Error("This username is already in use");
            }
        });
    }),
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email should be an email address"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters")
        .matches(/\d/)
        .withMessage('include at least one number'),
    check("email").custom(value => {
        return User.findOne({ email: value }).then(function(user) {
            if (user) {
                throw new Error("This email already have a Account");
            }
        });
    })
];

router.post('/signUp',signUpValidation,(req, res) => {
    console.log("aa"+req.body);
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.mapped() });
    }else {
        userController.SignUp(req.body)
            .then(data => {
                res.status(data.status).send({success:data.success, message: data.message});
            })
            .catch((error) => {
                console.log(error);
                res.status(error.status).send({errors:error.errors, message: "error " + error.message});
            })
    }
} );

    const logInValidation = [
        check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email should be an email address"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Password is required")
    ];

router.post('/logIn',logInValidation,(req, res) => {
    console.log(req.body);
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.mapped() });
    }else {
        userController.logIn(req.body)
            .then(data => {
                res.status(data.status).send({success: data.success, data: data.message});
            })
            .catch((error) => {
                console.log(error);
                res.status(error.status).send({errors: error.errors, message: "error " + error.message});
            })
    }
});

module.exports = router;

// router.post('/',(req,res) => {
//     console.log("xxx "+ req.body)
//     ;    controller.save(req.body).then( data => {
//         res.status(data.status).send({data: data.message});
//     }).catch((error) => {
//         console.log(error);
//         res.status(error.status).send({message: "error "+error.message});
//     })
// });