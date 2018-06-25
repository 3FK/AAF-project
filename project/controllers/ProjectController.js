const Project = require('../models/Project');

var ProjectContoller = function (){

    this.createProject = (data) => {
        console.log(data);
        return new Promise((resolve, reject) => {
            var project = new Project({
                projectName: data.projectName ,
                projectDescription: data.projectDescription,
                DueDate:data.DueDate,
                projectOwner: data.projectOwner,
                Private:data.Private,
                Collaborators: data.Collaborators,
                projectField: data.projectField
            });
            project.save().then((data) => {
                console.log(data);
                console.log(data._id);
                resolve({status:200,  "success":true , message: "Saved successfully", data:data._id});
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
    // this method return details of one project
    this.individualProjects = (Pid) => {
        return new Promise((resolve, reject) => {
            Project.findOne({ _id: Pid})
                .then(function (project) {
                    if (!project) {
                        reject({status: 500, "success":false , errors:"Project not found"});
                    }
                    else {
                        if (project){
                            resolve({status:200,  "success":true , message: "Project found", name:project});
                        }
                        reject({status: 500, "success":false , errors:"Project not found"});
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject({status: 500, "success":false , errors:"Project not found"});
                })
        })
    };

    this.editProject = ( id,data) => {
        return new Promise((resolve, reject) => {
            Project.update({_id: id}, data).then((data) => {
                resolve({status: 200, message: "Project Successfully updated", data:data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    };

    this.deleteProject = (id) => {
        return new Promise((resolve, reject) => {
            Project.remove({_id:id}).then(() => {
                resolve({status: 200, message: "Project removed"});
            }).catch(err => {
                reject({status: 500, message:"Error:- " + err});
            })
        })
    };
    // get projects that current user created
    this.getUsersProjects = (Uid) => {
        return new Promise((resolve, reject) => {
            Project.find({ projectOwner: Uid})
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
                })
        })
    };
    // get projects that current user created and working projects that created by other users
    this.getAllUserProjects = (Uid) => {
        return new Promise((resolve, reject) => {
            Project.find({$or :
                [{ projectOwner: Uid},
                {Collaborators:{$elemMatch:{_id:Uid}}}]}
                )
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
                })
        })
    }
};
module.exports =new ProjectContoller();