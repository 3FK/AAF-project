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
            Private:'false',
            Contributors:'',
            projectField:''
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
                projectName: this.state.email,
                projectDescription: this.state.password,
                projectOwner: this.state.projectOwner,
                Private: this.state.Private,
                Contributors: this.state.Contributors,
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
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.emailError}</label>
                    </div>
                    <div className="row">
                        <div >Project Description :</div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Project Description"
                            id="projectDescription"
                            name="projectDescription"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.passwordError}</label>
                    </div>
                    <div className="">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="form-check-label">Private</label>
                    </div>
                    <div className="row">
                        <div >Project Description :</div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Project Description"
                            id="projectDescription"
                            name="projectDescription"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="">
                        <div className="">
                            <a href="/password-forgot" className="" aria-busy="false">Forgot my password!</a>
                        </div>
                    </div>
                    <button type="submit" className="btn " name="login-button">Log in</button>
                </form>
                <label>{this.state.email}</label><br/>
                <label>{this.state.password}</label><br/>
            </div>
        );
    }
}

export default CreateProject;