import React, { Component } from 'react';
import './css/profile.css';
import {Link} from 'react-router-dom';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:false,
            projectsFound:false,
            Projects:[],
            id:'',
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            country:'',
            description:''
        };
    };
    componentDidMount(){
        if (this.props.match.params.id) {
            const id = this.props.match.params.id;
            this.getUser(id);
            this.getUsersProjects(id);
            this.getProjects();
        }
        else {
            if (localStorage.getItem('id')) {
                const userid = localStorage.getItem('id');
                this.getUser(userid);
                this.getUsersProjects(userid);
                this.setState({
                    user:true
                });
                this.getProjects();
            }
            else {
                return (window.location="/login");
            }
        }
    }
    manage = () => {
        if (this.state.user===true){
            return(
                <div className="btn-group profile-btn" role="group" aria-label="Basic example">
                    <Link
                        className="btn btn-primary"
                        to={"/EditProfile/"+(this.state.id)}
                        name="view"
                    >
                        Edit Profile
                    </Link>
                    <Link
                        className="btn btn-warning"
                        to={"/ChangePassword/"+(this.state.id)}
                        name="view"
                    >
                        Change Password
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        name="login-button"
                        onClick={this.deleteUser}
                    >
                        Delete Profile
                    </button>
                </div>
            )
        }

    };
    deleteUser = (id) =>{
            fetch("http://192.168.96.1:3001/user/deleteUser?id="+this.state.id, {
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
                        alert("user Successfully deleted ");
                        localStorage.clear();
                        return (window.location="/");
                    }
                })
                .catch((error) => {
                    alert(error);
                    console.log(error);
                })
            // .done();
    };
    getUser = (id) => {
        fetch("http://localhost:3001/user/findUser?u="+id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.success === true) {
                    console.log(res.name._id);
                    this.setState({
                        id: res.name._id,
                        firstname: res.name.firstname,
                        lastname: res.name.lastname,
                        username: res.name.username,
                        email: res.name.email,
                        country:res.name.country,
                        description:res.name.description
                    });

                }
                else {

                }
            });
    };
    getUsersProjects = (id) => {
        fetch("http://192.168.96.1:3001/project/ProjectByUser?id="+id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // 'x-access-token':localStorage.getItem('jwtToken'),
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.success === true) {
                    for(let item of res.name) {
                        this.state.Projects.push(item);
                    }
                    this.setState({
                        projectsFound:true
                    })
                    this.setState(this.state);
                    console.log(this.state.Projects);
                }
                else {
                    alert('no projects to show');
                    this.noProjects();
                }
            });
    };
    noProjects = () => {
        if (this.state.projectsFound===false){
            return(
                <div className=" myProject-from col-md-5">
                    <div className="myProject-title">No Projects yet create one Now</div>
                    <Link
                        className="btn btn-success myProject-btn"
                        to={"/createProject"}
                        name="view"
                    >
                        Create Project
                    </Link>
                </div>
            )
        }

    };
    getProjects= () =>{
        let ProjectsArray=[];
        for(let item of this.state.Projects){
            ProjectsArray.push(

                <div className="profileProject-from  col-md-3" key={item._id}>
                    <div align="center" className="myProject-title">
                        {item.projectName}
                    </div>
                    <div className="myProject-text text-info">
                        <div className="myProject-text">Description :</div>
                        {item.projectDescription}
                    </div>
                    <div className="myProject-text text-info">
                        <div className="myProject-text">Due Date :</div>
                        {item.DueDate}
                    </div>
                    <div>
                        {
                            (typeof (item.projectField)==='object')?
                                <div className="text-info myProject-text">
                                    <div className="myProject-text">Project Fields :</div>
                                    {
                                        item.projectField.map((gg) =>
                                            <div align="center">
                                                {gg}
                                            </div>
                                        )
                                    }
                                </div>
                                :
                                null
                        }
                    </div>
                    <div align="center" className="">
                        <Link
                            className="btn btn-success myProject-btn"
                            to={"/projectPage/"+(item._id)}
                            name="view"
                        >
                            View Project
                        </Link>
                    </div>
                </div>);
            console.log(ProjectsArray)
        }
        return ProjectsArray;
    };
    render() {
        return (
            <div className="container-fluid col-md-12 ">
                <div className="profile-form">
                    <div className="">
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="a font-weight-bold font-italic name profile-main-title">
                                        Hi, I'm  {this.state.username}
                                    </div>
                                    <div className="a font-weight-bold font-italic profile-title">
                                        From {this.state.country}
                                    </div>
                                </div>
                                <div className="profileDesc col-md-3">
                                    {this.manage()}
                                </div>
                            </div>
                            <div className="profile-text profileDescCustom">
                                 {this.state.description}
                            </div>
                        </div>
                        <div>
                            <div align="center" className="profile-title">Projects</div>
                            {this.getProjects()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
