import React, { Component } from 'react';
import './css/MyProjects.css';
import {Link} from 'react-router-dom';

class MyProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectFound:false,
            Projects:[],
        };
    }
    componentDidMount(){
        if (localStorage.getItem('id')) {
            const userid = localStorage.getItem('id');
            this.getUsersProjects(userid);
        }
        else {
            return (window.location="/login");
        }
    }
    getUsersProjects = (id) => {
        fetch("http://192.168.96.1:3001/project/allUserProjects?id="+id, {
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
                        projectFound:true
                    });
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
        if(this.state.projectFound===false){
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

                <div className="myProject-from  col-md-3" key={item._id}>
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
            <div className="container-fluid body col-md-12">
                <div align="center"  className="myProject-main-title">
                    My Projects
                </div>
                <div className="row">
                    {this.getProjects()}
                </div>
                <div>
                    {this.noProjects()}
                </div>
            </div>
        )}
}
export default MyProjects;