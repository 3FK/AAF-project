import React, { Component } from 'react';

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
                        <button
                            type="button"
                            className="btn "
                            //onClick={()=>{this.removeCollaborators(item)}}
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

    render(){
        return (
            <div className="body">
                {this.getProjects()}
            </div>
        )
    }
}

export default PublicProjects;