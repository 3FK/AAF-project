import React, { Component } from 'react';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id:this.props.params.id,
            Project:[],
        };
    };
    componentDidMount(){
        this.getProjects();
        console.log(this.props.match.params.id);
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
                    for(let item of res.name) {
                        this.state.Project.push(item);
                    }
                    this.setState(this.state);
                    console.log(this.state.Project);
                }
                else {
                    alert('no projects to show');
                }
            });
    };
    showProject= () =>{
        let ProjectsArray=[];
        for(let item of this.state.Project){
            ProjectsArray.push(
                <div key={item._id}>
                    <div className="d-inline">
                        {item.projectName}
                    </div>
                    <div>
                        {item.projectDescription}
                    </div>
                </div>);
            console.log(ProjectsArray)
        }

        return ProjectsArray;
    };
    render() {
        return (
            <div className="container-fluid body col-md-12">
                <div>
                    <div>
                        {this.showProject()}
                        {/*{this.state.Project.projectName}*/}
                    </div>
                </div>
            </div>
        )}
}
export default ProjectPage;