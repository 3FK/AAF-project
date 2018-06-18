import React, { Component } from 'react';
import './css/CreateProject.css';

class EditProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectNameError:'',
            projectDescription: '',
            projectDescriptionError:'',
            DueDate:'',
            DueDateError:'',
            projectOwner:'',
            Private:false,
            Collaborators:[],
            searchUser:'',
            projectField:[],
            field:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }
    handleSubmit(e) {
        // alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        this.editProject();
    }
    componentDidMount(){
        if (!localStorage.getItem('id')) {
            // alert("please login to create project");
            return (window.location="/login");
        }
        else {
            this.getProjects()
        }
    }
    getProjects = () => {
        fetch("http://192.168.96.1:3001/project/Project?id="+this.props.match.params.id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.success === true) {
                    alert('project found');
                    // for(let item of res.name){
                    this.setState({
                        id:res.name._id,
                        projectName: res.name.projectName,
                        projectDescription: res.name.projectDescription,
                        DueDate:res.name.DueDate,
                        projectOwner:res.name.projectOwner,
                        Private:res.name.Private,
                        Collaborators:res.name.Collaborators,
                        projectField:res.name.projectField,
                    });
                    console.log(res.name.projectName);
                    console.log(this.state.Collaborators);
                    // }
                    // this.state.Project.push(item);
                    // }
                    this.setState(this.state);
                }
                else {
                    alert('no projects to show');
                }
            });
    };
    editProject = () => {
        this.setState({
            projectNameError:'',
            projectDescriptionError:''
        })
        fetch("http://192.168.96.1:3001/project/editProject?id="+this.state.id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectName: this.state.projectName,
                projectDescription: this.state.projectDescription,
                DueDate:this.state.DueDate,
                projectOwner: this.state.projectOwner,
                Private: this.state.Private,
                Collaborators: this.state.Collaborators,
                projectField: this.state.projectField
            })
        })
            .then(Response => Response.json())
            .then(res => {
                if (res.success === true) {
                    alert("Project updated");
                    return (window.location="/projectPage/"+this.props.match.params.id);
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
                alert("server error");
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
            CollaboratorsArray.push(
                <div key={item._id}>
                    <div className="input-group createProject-btn">
                        <input
                            type="text"
                            className="form-control text-success col-md-2"
                            value={item.username}
                            readOnly
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={()=>{this.removeCollaborators(item)}}
                                name="remove"
                            >
                                Remove
                            </button>
                        </div>
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
                <div className="input-group createProject-btn">
                    <input
                        type="text"
                        className="form-control text-success col-md-1"
                        value={item}
                        readOnly
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={()=>{this.removeField(item)}}
                            name="remove"
                        >
                            Remove
                        </button>
                    </div>
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
            <div className="container-fluid body ">
                <form className="createProject-from col-md-10" onSubmit={this.handleSubmit}>
                    <div className="createProject-title">Edit Your Project!</div>
                    <div className="form-group row login">
                        <div className="createProject-text">Project Name :</div>
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
                        <div className="createProject-text">Project Description :</div>
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
                    <div className="settings-item">
                        <div className="createProject-text">Due Date :</div>
                        <input
                            className="form-control"
                            type="date"
                            id="DueDate"
                            name="DueDate"
                            onChange={this.handleChange}
                            value={this.state.DueDate}
                        />
                    </div>
                    <div className="row">
                        <div className="createProject-text">Collaborators :</div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Collaborators"
                                id="searchUser"
                                name="searchUser"
                                value={this.state.searchUser}
                                onChange={this.handleChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-info"
                                    type="button"
                                    onClick={this.getUser}
                                    name="searchUser"
                                >
                                    Search User
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.getCollaborators()}
                    </div>
                    <div className="row">
                        <div className="createProject-text">Project Fields :</div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="eg: react angular java c++ "
                                id="field"
                                name="field"
                                value={this.state.field}
                                onChange={this.handleChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-info"
                                    type="button"
                                    onClick={this.addField}
                                    name="addField"
                                >
                                    Add Fields
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.getProjectFields()}
                    </div>
                    <div className="row">
                        <label className="createProject-text">
                            <input
                                className="createProject-checkbox"
                                type="checkbox"
                                name="Private"
                                id="Private"
                                onChange={this.checkPrivate}
                            />
                            Private
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success createProject-btn" name="login-button">Save Project</button>
                </form>
            </div>
        );
    }
}

export default EditProject;