const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const userController = require('../controllers/UserController');
const bodyparser = require("body-parser");
const User = require('../models/User');

/* GET users listing. */
router.get('/users', function(req, res, next) {
    userController.showUsers()
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message  , name:data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
});

router.get('/findUser', function(req, res, next) {
    var user = req.param('u');
    console.log(user);
    userController.findUser(user)
        .then(data => {
            res.status(data.status).send({success: data.success, data: data.message, name: data.name});
        })
        .catch((error) => {
            console.log(error);
            res.status(error.status).send({errors: error.errors, message: "error " + error.message});
        })
    //}
});

router.get('/getUser', function(req, res, next) {
    // res.send('respond with a resource');
    // if (!isLoggedIn){
    //     res.status(error.status).send({errors: error.errors, message: "log in " + error.message});
    // }
    // else {
        var user = req.param('u');
        console.log(user);
        userController.getUser(user)
            .then(data => {
                res.status(data.status).send({success: data.success, data: data.message, name: data.name});
            })
            .catch((error) => {
                console.log(error);
                res.status(error.status).send({errors: error.errors, message: "error " + error.message});
            })
    //}
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
    }),
    check("country")
        .not()
        .isEmpty()
        .withMessage("Country is required"),
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
});

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

function isLoggedIn(req, res) {
    if (req.session.isLoggedIn) {
        res.send(true);
    } else {
        res.send(false);
    }
}
router.get('/log',isLoggedIn);

router.post('/logIn',logInValidation,(req, res) => {
    console.log(req.body);
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.mapped() });
    }else {
        userController.logIn(req.body)
            .then(data => {
                console.log(data.data);
                console.log(data.data._id);
                // req.session.data = data.data;
                // req.session.isLoggedIn = true;
                res.status(data.status).send({success: data.success, message: data.message, data:data.data,token: data.token});
            })
            .catch((error) => {
                console.log(error);
                res.status(error.status).send({errors: error.errors, message: "error " + error.message});
            })
    }
});

const userEditValidation = [
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
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email should be an email address"),
];

router.put('/editUser', userEditValidation, (req, res) => {
    console.log(req.param('id'));
    const id = req.param('id');
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.mapped() });
    }else {
        userController.editUser(id, req.body).then(data => {
            res.status(data.status).send({success: true,message: data.message});
        }).catch(err => {
            res.status(err.status).send({message: err.message});
        })
    }
});
const changePasswordValidation = [
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required"),
    check("NewPassword")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters")
        .matches(/\d/)
        .withMessage('include at least one number'),
];
router.put('/changePassword', changePasswordValidation, (req, res) => {
    console.log(req.param('id'));
    const id = req.param('id');
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ errors: errors.mapped() });
    }else {
        userController.ChangePassword(id, req.body).then(data => {
            res.status(data.status).send({success: true,message: data.message});
        }).catch(err => {
            res.status(err.status).send({message: err.message});
        })
    }
});


router.delete('/deleteUser', (req, res) => {
    console.log(req.param('id'));
    const id = req.param('id');
    userController.deleteUser(id).then(data => {
        res.status(data.status).send({success: true, message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
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