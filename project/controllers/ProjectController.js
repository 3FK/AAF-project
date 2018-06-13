const Project = require('../models/Project');

var ProjectContoller = function (){

    this.createProject = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            var project = new Project({
                projectName: data.projectName ,
                projectDescription: data.projectDescription,
                projectOwner: data.projectOwner,
                Private:data.Private,
                Contributors: data.Contributors,
                projectField: data.projectField
            });
            project.save().then((data) => {
                resolve({status:200,  "success":true , message: "Saved successfully"});
            }).catch((error) => {
                reject({status: 500, errors:error, message: "eror in saving"+error});
            })
        })
    };

    this.showProjects = () => {
        return new Promise((resolve, reject) => {
           Project.find()
                .then(function (project) {
                    if (!project) {
                        // return res.send({error: true, message: "User does not exist!"});, message: "error in saving"+error
                        reject({status: 500, "success":false , errors:"Project not found"});
                    }
                    resolve({status:200,  "success":true , message: "Project found", name:project});
                    console.log(gg);
                    // return res.send({message: "You are signed in"});
                })
        })
    };
};
module.exports =new ProjectContoller();