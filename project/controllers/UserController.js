const User = require('../models/User');
const jwt = require('jsonwebtoken');
const objectId = require('mongodb').ObjectId;
const mongo = require('mongodb').MongoClient;

const jwtSecret = 'keyforjwt';

var UserContoller = function (){

    this.SignUp = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            var user = new User({
                firstname: data.firstname ,
                lastname: data.lastname,
                username: data.username,
                email: data.email.toLowerCase(),
                password: data.password,
                country:data.country,
                description:data.description
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
                    const token = jwt.sign({
                        id: user.get('_id'),
                        username: user.get('username')
                    }, jwtSecret);
                    resolve({status:200,  "success":true , message: "You are signed in", data:user, token:token});
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
                    console.log(user);
                    // return res.send({message: "You are signed in"});
                })
        })
    };

    this.findUser = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            User.findOne({
               _id:data
            })
                .then(function (user) {
                    if (!user) {
                        reject({status: 500, "success":false , errors:"user not found"});
                    }

                    resolve({status:200,  "success":true , message: "user found", name:user});
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

    // this.editUser = (id, data) => {
    //     return new Promise((resolve, reject) => {
    //         var user = new User({
    //             firstname: data.firstname ,
    //             lastname: data.lastname,
    //             username: data.username,
    //             email: data.email.toLowerCase(),
    //             password: data.password
    //         });
    //         user.password = user.hashPassword(user.password);
    //         User.update({_id: id}, user).then((data) => {
    //             resolve({status: 200, message: "User Successfully updated"});
    //         }).catch(err => {
    //             reject({status: 500, message: "Error:- " + err});
    //         })
    //     })
    // };

    this.editUser = (id, data) => {
        return new Promise((resolve, reject) => {
            var user = new User({
                _id:id,
                firstname: data.firstname ,
                lastname: data.lastname,
                username: data.username,
                email: data.email.toLowerCase(),
                country:data.country,
                description:data.description
            });
            User.update({_id: id}, user).then(() => {
                resolve({status: 200, message: "User Successfully updated"});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    };
    this.ChangePassword = (id, data) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                _id: id
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
                    const pass = user.hashPassword(data.NewPassword);
                    User.update({_id: id}, {password:pass}).then(() => {
                        resolve({status: 200, message: "password Successfully Changed"});
                    }).catch(err => {
                        reject({status: 500, message: "Error:- " + err});
                    })
                })
        })

    };

    this.deleteUser = (id) => {
        return new Promise((resolve, reject) => {
            User.remove({_id:id}).then(() => {
                resolve({status: 200, message: "User removed"});
            }).catch(err => {
                reject({status: 500, message:"Error:- " + err});
            })
        })
    };

};

module.exports =new UserContoller();