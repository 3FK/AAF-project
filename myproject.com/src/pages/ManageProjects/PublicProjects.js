import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.success === true) {
                    alert('project found');
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
                <div key={item._id}>
                    <div className="d-inline">
                        {item.projectName}
                    </div>
                    <div>
                        {item.projectDescription}
                    </div>
                    <div>
                        {
                            (typeof (item.Collaborators)==='object')?
                                <div>
                                    {
                                        item.Collaborators.map((gg) =>
                                            <div>
                                                {gg.username}
                                                <Link
                                                    type="button"
                                                    className="btn "
                                                    to={"/profile/"+(gg._id)}
                                                    name="remove"
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
                    <div>
                        {
                            (typeof (item.projectField)==='object')?
                                <div>
                                    {
                                        item.projectField.map((gg) =>
                                            <div>
                                                {gg}
                                            </div>
                                        )
                                    }
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className="d-inline">
                        <Link
                            type="button"
                            className="btn "
                            to={"/projectPage/"+(item._id)}
                            name="remove"
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
            <div className="body">
                {this.getProjects()}
            </div>
        )
    }
}

export default PublicProjects;