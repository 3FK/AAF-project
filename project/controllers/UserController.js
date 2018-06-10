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
                email: data.email,
                password: data.password
            });
            user.password = user.hashPassword(user.password);
            user.save().then((data) => {
                resolve({status:200,  "success":true , message: "Saved successfully"});
            }).catch((error) => {
                reject({status: 500, errors:error, message: "eror in saving"+error});
            })
        })
    }
}

    // exports.SignUp = function (req, res) {
    //     var user = new User(req.body);
    //     // user.password = user.hashPassword(user.password);
    //     user.save().then(user => {
    //         res.send('user added');
    //     })
    // };
module.exports =new UserContoller();