import React, { Component } from 'react';
import '../css/bootstrap.css';
import '../css/login.css';
class CreateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectNameError:'',
            projectDescription: '',
            projectDescriptionError:'',
            projectOwner:'oshada',
            Private:false,
            Collaborators:[],
            searchUser:'',
            projectField:[],
            field:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.removeUser = this.removeUser.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }
    handleSubmit(e) {
        // alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        this.createProject();
    }
    createProject = () => {
        this.setState({
            projectNameError:'',
            projectDescriptionError:''
        })
        fetch("http://192.168.96.1:3001/project/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectName: this.state.projectName,
                projectDescription: this.state.projectDescription,
                projectOwner: this.state.projectOwner,
                Private: this.state.Private,
                Collaborators: this.state.Collaborators,
                projectField: this.state.projectField
            })
        })
            .then(Response => Response.json())
            .then(res => {
                if (res.success === true) {
                    alert("Project created");
                }
                else {
                    if (res.errors.projectName) {
                        this.setState({
                            projectNameError:res.errors.projectName.msg
                        });
                    }
                    if (res.errors.projectDescription) {
                        this.setState({
                            projectDescriptionError:res.errors.projectDescription.msg
                        });
                    }
                    else {
                        alert(res.errors);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };
    getUser = () => {
        const result = this.state.Collaborators.find( f => f.username === this.state.searchUser || f.email === this.state.searchUser );

        if (!result) {
            fetch("http://192.168.96.1:3001/user/getUser?u=" + this.state.searchUser, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(res => {
                    if (res.success === true) {
                        alert('user found');
                        this.state.Collaborators.push(res.name);
                        this.setState(this.state);
                        this.setState({searchUser: ''});
                        console.log(this.state.Collaborators);
                    }
                    else {
                        alert('user not found');
                        this.setState({searchUser: ''});
                    }
                });
        }
        else {
            alert('Collaborator already added');
        }
    };
    getCollaborators= () =>{
        let CollaboratorsArray=[];
        for(let item of this.state.Collaborators){
            CollaboratorsArray.push(<div key={item._id}>
                <div className="d-inline">
                    {item.username}
                </div>
                <div className="d-inline">
                    <button
                        type="button"
                        className="btn "
                        onClick={()=>{this.removeCollaborators(item)}}
                        name="remove"
                    >remove
                    </button>
                </div>
            </div>);
        }
        return CollaboratorsArray;
    };
    removeCollaborators = (field) => {
        for(var i = 0; i < this.state.Collaborators.length; i++){
            if(this.state.Collaborators[i] == field){
                this.state.Collaborators.splice(i,1);
            }
        }
        this.setState({
            Collaborators: this.state.Collaborators
        });
        console.log(this.state.Collaborators);
    };
    addField = () => {
        // var found = this.state.projectField.find(this.state.field);
        const result = this.state.projectField.find( f => f === this.state.field );
        if (!result) {
            this.state.projectField.push(this.state.field);
            this.setState(this.state);
            this.setState({field: ''});
            // console.log(this.state.projectField);
        }
        else {
            alert('Field already added');
            this.setState({field: ''});
        }
    };
    getProjectFields= () =>{
        let ProjectFieldArray=[];
        for(let item of this.state.projectField){
            ProjectFieldArray.push(<div>
                <div className="d-inline">
                    {item}
                </div>
                <div className="d-inline">
                    <button
                        type="button"
                        className="btn "
                        onClick={()=>{this.removeField(item)}}
                        name="remove"
                    >remove
                    </button>
                </div>
            </div>);
        }
        return ProjectFieldArray;
    };
    removeField = (field) => {
        for(var i = 0; i < this.state.projectField.length; i++){
            if(this.state.projectField[i] == field){
                this.state.projectField.splice(i,1);
            }
        }
        this.setState({
            projectField: this.state.projectField
        });
        console.log(this.state.projectField);
    };
    checkPrivate = () => {
        this.setState({
            Private: !this.state.Private
        })
    }

    render() {
        return (
            <div className="container-fluid body col-md-8">
                <form className="" onSubmit={this.handleSubmit}>
                    <div className="form-group row login">
                        <div >Project Name :</div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Project Name"
                            id="projectName"
                            name="projectName"
                            value={this.state.projectName}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.projectNameError}</label>
                    </div>
                    <div className="row">
                        <div >Project Description :</div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Project Description"
                            id="projectDescription"
                            name="projectDescription"
                            value={this.state.projectDescription}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.projectDescriptionError}</label>
                    </div>
                    <div className="row">
                        <div className="">Collaborators :</div>
                        <input
                            className="form-control d-inline "
                            type="text"
                            placeholder="Collaborators"
                            id="searchUser"
                            name="searchUser"
                            value={this.state.searchUser}
                            onChange={this.handleChange}
                        />
                        <button type="button" className="btn d-inline " onClick={this.getUser} name="searchUser">Search User</button>
                    </div>
                    <div>
                        {this.getCollaborators()}
                    </div>
                    <div className="row">
                        <div className="">Project Fields :</div>
                        <input
                            className="form-control d-inline "
                            type="text"
                            placeholder="eg: react angular java c++ "
                            id="field"
                            name="field"
                            value={this.state.field}
                            onChange={this.handleChange}
                        />
                        <button type="button" className="btn d-inline " onClick={this.addField} name="addField">Add Fields</button>
                    </div>
                    <div>
                            {this.getProjectFields()}
                    </div>
                    <div className="">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="Private"
                            id="Private"
                            // ref="complete"
                            onChange={this.checkPrivate}
                        />
                        <label className="form-check-label">Private</label>
                    </div>

                    <button type="submit" className="btn " name="login-button">Create Project</button>
                </form>
            </div>
        );
    }
}

export default CreateProject;