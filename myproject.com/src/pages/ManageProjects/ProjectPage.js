import React, { Component } from 'react';
import './css/ProjectPage.css';
import {Link} from 'react-router-dom';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:false,
            id:'',
            Project:[],
            projectName: '',
            projectDescription: '',
            DueDate:'',
            projectOwner:'',
            Private:'',
            Collaborators:[],
            projectField:[],
        };
    };
    componentDidMount(){
        this.getProjects();
        if (this.state.projectOwner===localStorage.getItem('id')){
            this.setState({
                user:true
            })
        }
        console.log(this.props.match.params.id);
    }
    manage = () => {
        if (this.state.user===true){
            return (
                <div className="btn-group projectPage-btn" role="group" aria-label="Basic example">
                    <Link
                        className="btn btn-primary"
                        to={"/editProject/"+(this.state.id)}
                        name="view"
                    >
                        Modify Project
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        name="login-button"
                        onClick={this.deleteProject}
                    >
                        Delete Project
                    </button>
                </div>
            )
        }

    };
    desc = () => {
        return (
            <div>{this.state.projectDescription}</div>
        )
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
    deleteProject = () => {
        fetch("http://192.168.96.1:3001/project/deleteProject?id="+this.state.id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(Response => Response.json())
            .then(res => {
                // alert(res.message);
                if (res.success === true) {
                    alert("Project Successfully deleted ");
                    return (window.location="/profile");
                }
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            })
        // .done();
    };

    render() {
        return (
            <div className="container-fluid body col-md-12">
                <div>
                    <div className=" ">
                        <div className="projectPage-from col-md-10" key={this.state._id}>
                            <div className="row col-md-10">
                                <div className="projectPage-main-title ">
                                    {this.state.projectName}
                                </div>
                                <div className="desc">
                                    <div className="projectPage-text projectPage-DueDate">Due Date : {this.state.DueDate}</div>
                                    <div className="projectPage-manage col-md-2">
                                        <div >
                                            {this.manage()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                                <div align="center" className="projectPage-Users col-md-4">
                                    {
                                        (typeof (this.state.Collaborators)==='object')?
                                            <div  >
                                                <div className="projectPage-title">Collaborators</div>
                                                {
                                                    this.state.Collaborators.map((gg) =>
                                                        <div className="projectPage-Users-space projectPage-text">
                                                            {gg.username}<br/>
                                                            <Link
                                                                className="btn btn-success"
                                                                to={"/profile/"+(gg._id)}
                                                                name="view"
                                                            >
                                                                View User
                                                            </Link>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                                <div align="center"  className="projectPage-Users col-md-4">
                                    {
                                        (typeof (this.state.projectField)==='object')?
                                            <div >
                                                <div className="projectPage-title">Project Field</div>
                                                {
                                                    this.state.projectField.map((gg) =>
                                                        <div className="projectPage-Users-space projectPage-text">
                                                            {gg}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="projectPage-title projectPage-text">Project Description :</div>
                                <div className="projectPage-text projectPage-desc col-md-5">
                                    {this.desc()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
}
export default ProjectPage;