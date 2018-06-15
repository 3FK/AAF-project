const User = require('../models/User');
var { check, validationResult } = require("express-validator/check");

var UserContoller = function (){

    this.SignUp = (data) => {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ errors: errors.array() });
        // }

        console.log(data);
        return new Promise((resolve, reject) => {
            var user = new User({
                firstname: data.firstname ,
                lastname: data.lastname,
                username: data.username,
                email: data.email.toLowerCase(),
                password: data.password
            });
            user.password = user.hashPassword(user.password);
            user.save().then((data) => {
                resolve({status:200,  "success":true , message: "Saved successfully"});
            }).catch((error) => {
                reject({status: 500, errors:error, message: "error in saving"+error});
            })
        })
    };

    this.logIn = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            User.findOne({
                email: data.email.toLowerCase()
            })
                .then(function (user) {
                    if (!user) {
                        // return res.send({error: true, message: "User does not exist!"});, message: "error in saving"+error
                        reject({status: 500, "success":false , errors:"User not found"});
                    }
                    if (!user.comparePassword(data.password, user.password)) {
                        // return res.send({error: true, message: "Wrong password!"});, message: "error in saving"+error
                        reject({status: 500, "success":false , errors:"Invalid Password "});
                    }
                    resolve({status:200,  "success":true , message: "You are signed in", data:user});
                    // return res.send({message: "You are signed in"});
                })
        })
    };

    this.showUsers = () => {
        return new Promise((resolve, reject) => {
            User.find()
                .then(function (user) {
                    if (!user) {
                        // return res.send({error: true, message: "User does not exist!"});, message: "error in saving"+error
                        reject({status: 500, "success":false , errors:"User not found"});
                    }
                    resolve({status:200,  "success":true , message: "User found", name:user});
                    console.log(gg);
                    // return res.send({message: "You are signed in"});
                })
        })
    };
    this.getUser = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            User.findOne({
                $or: [{username:data},{email:data.toLowerCase()}]
            })
                .then(function (user) {
                    if (!user) {
                        reject({status: 500, "success":false , errors:"user not found"});
                    }
                    resolve({status:200,  "success":true , message: "user found", name:user});
                })
        })
    };

};

module.exports =new UserContoller();