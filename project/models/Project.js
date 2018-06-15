const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectName:{
        type:   String,
        required:   true
    },
    projectDescription:{
        type: String,
        required:   true
    },
    projectOwner:{
        // Schema.Types.ObjectId
        type: String,
        required: true
        // ref: "User"
    },
    Private:{
        type:   Boolean,
        required:   true
    },
    Collaborators:{
        type: [],
    },
    projectField:{
        type: [],
        required: true
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

module.exports = Project = mongoose.model('Project', ProjectSchema);
mongoose.connect('mongodb://localhost:27017/myProject');

let db = mongoose.connection;

db.once('open', function () {
    console.log('mongoDB running');
});