import React, { Component } from 'react';

class ProjectPage extends Component {
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
                                            <div key={gg.username}>
                                                {gg.username}
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
                                            <div key={gg}>
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
                        <button
                            type="button"
                            className="btn "
                            onClick={()=>{this.showProject(item._id)}}
                            name="remove"
                        >
                            View Project
                        </button>
                    </div>
                </div>);
            console.log(ProjectsArray)
        }

        return ProjectsArray;
    };
    showProject = () => {
        // return (window.location = "/projectPage")
    };

    render(){
        return (
            <div className="body">
                {this.getProjects()}
            </div>
        )
    }
}

export default ProjectPage;
