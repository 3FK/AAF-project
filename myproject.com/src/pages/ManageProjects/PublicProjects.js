import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/PublicProject.css';

class PublicProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Projects:[],
        };
    }
    componentDidMount(){
        this.getPublicProjects();
    }
    getPublicProjects = () => {
        fetch("http://192.168.96.1:3001/project/searchProject", {
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
                    this.setState(this.state);
                    console.log(this.state.Projects);
                }
                else {
                    alert('no projects to show');
                }
            });
    };
    getProjects= () =>{
        let ProjectsArray=[];
        for(let item of this.state.Projects){
            ProjectsArray.push(
                <div className="publicProject-from col-md-3" key={item._id}>
                    <div align="center" className="publicProject-title">
                        {item.projectName}
                    </div>
                    <div className="publicProject-text text-info">
                        <div className="publicProject-text">Description :</div>
                        {item.projectDescription}
                    </div>
                    <div>
                        <div className="myProject-text">Collaborators :</div>
                        {
                            (typeof (item.Collaborators)==='object')?
                                <div>
                                    {
                                        item.Collaborators.map((gg) =>
                                            <div className="myProject-text text-info">
                                                <div align="center">
                                                    <div >
                                                        {gg.username}
                                                    </div>
                                                    <Link
                                                        className="btn btn-info publicProject-btn"
                                                        to={"/profile/"+(gg._id)}
                                                        name="view"
                                                    >
                                                        View User
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                :
                                null
                        }
                    </div>
                    <div>
                        {
                            (typeof (item.projectField)==='object')?
                                <div className="publicProject-text text-info">
                                    <div className="publicProject-text">Project Fields :</div>
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
                            className="btn btn-success publicProject-btn"
                            to={"/projectPage/"+(item._id)}
                            name="View"
                        >
                            View Project
                        </Link>
                    </div>
                </div>);
            console.log(ProjectsArray)
        }

        return ProjectsArray;
    };


    render(){
        return (
            <div className="row">
                {this.getProjects()}
            </div>
        )
    }
}

export default PublicProjects;