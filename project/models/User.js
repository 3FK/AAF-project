const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = new Schema({
    firstname:{
        type:   String,
        required:   true
    },
    lastname:{
        type:   String,
        required:   true
    },
    username:{
        type:   String,
        // unique:   true,
        required:   true
    },
    email:{
        type:   String,
        // unique:   true,
        required:   true
    },
    password:{
        type:   String,
        required:   true
    },
    createdAt:{
        type:   Date,
        required:   true,
        default:    Date.now
    },
    updatedAt:{
        type:   Date,
        required:   true,
        default:    Date.now
    }
});

UserSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password,12);
};
UserSchema.methods.comparePassword = function (password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = User = mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost:27017/myProject');

let db = mongoose.connection;

db.once('open', function () {
    console.log('mongoDB running');
});