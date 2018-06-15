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
                Collaborators: data.Collaborators,
                projectField: data.projectField
            });
            project.save().then((data) => {
                resolve({status:200,  "success":true , message: "Saved successfully"});
            }).catch((error) => {
                reject({status: 500, errors:error, message: "error in saving"+error});
            })
        })
    };

    this.showProjects = () => {
        return new Promise((resolve, reject) => {
           Project.find({ Private: false})
                .then(function (project) {
                    if (!project) {
                        reject({status: 500, "success":false , errors:"Project not found"});
                    }
                    else {
                        if (project.length>0){
                            resolve({status:200,  "success":true , message: "Project found", name:project});
                        }
                        reject({status: 500, "success":false , errors:"Project not found"});
                    }
                })
               .catch((error) => {
                   console.log(error);
                   reject({status: 500, "success":false , errors:"Project not found"});
                   //res.status(error.status).send({errors: error.errors, message: "error " + error.message});
               })
        })
    };
};
module.exports =new ProjectContoller();