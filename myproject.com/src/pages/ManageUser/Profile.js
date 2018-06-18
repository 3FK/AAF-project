import React, { Component } from 'react';
import pic from '../../assets/reviwers/reviwer2.jpg';
import './css/profile.css';
import {Link} from 'react-router-dom';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
        else {
            if (localStorage.getItem('id')) {
                const userid = localStorage.getItem('id');
                this.getUser(userid);
                this.getUsersProjects(userid);
            }
            else {
                return (window.location="/login");
            }
        }

        // console.log(this.props.match.params.id);

    }
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
                    alert('user found');
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
                    alert('no projects to show');
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
    render() {
        return (
            <div className="container-fluid col-md-12 ">
                <div className="row">
                    <div>
                        <img className="rounded image" src={pic} />
                    </div>
                    <div>
                        <Link
                            type="button"
                            className="btn "
                            to={"/EditProfile/"+(this.props.match.params.id)}
                            name="remove"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div>
                        <div className="a font-weight-bold font-italic name profile-title">
                            Hi, I'm{this.state.username} !
                        </div>
                        <div className="a font-weight-bold font-italic address">
                            Anuradhapura, SriLanka.
                        </div>
                        <div className="user-details">
                            Full-stack engineer on an employer facing team<br/>
                            - Implemented an email content generation service, simplified previous process of adding new email
                            from modifying 4 projects to 2 projects<br/>
                        </div>
                        {/*<div className="edit-profile">*/}
                            {/*<a className="btn btn-secondary text-black-50 " href="#" role="button">Edit profile</a>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="a font-weight-bold title">
                        Projects
                    </div>
                    <div className="row">
                        <div className="project-card " >
                            <a className="text-dark" href="#" role="button">android</a><br/>
                            <label>
                                Forked from pbarbiero/basic-electron-react-boilerplate
                            </label>
                            <label className="d-inline">android</label>
                            <label className="d-inline">java</label>

                        </div>
                    </div>
                    {/*<div id="list-example" className="list-group ">*/}
                        {/*<a className="list-group-item bg-dark text-secondary list-group-item-action" href="#list-item-1">android</a>*/}
                        {/*<a className="list-group-item bg-dark text-secondary list-group-item-action" href="#list-item-2">react native</a>*/}
                        {/*<a className="list-group-item bg-dark text-secondary list-group-item-action" href="#list-item-3">laravel</a>*/}
                        {/*<a className="list-group-item bg-dark text-secondary list-group-item-action" href="#list-item-4">angular</a>*/}
                    {/*</div>*/}
                    {/*<div data-spy="scroll" data-target="#list-example" data-offset="0" className="projects col-md-8">*/}
                        {/*<h4 id="list-item-1">Item 1</h4>*/}
                        {/*<p>...</p>*/}
                        {/*<h4 id="list-item-2">Item 2</h4>*/}
                        {/*<p>...</p>*/}
                        {/*<h4 id="list-item-3">Item 3</h4>*/}
                        {/*<p>...</p>*/}
                        {/*<h4 id="list-item-4">Item 4</h4>*/}
                        {/*<p>...</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default Profile;
