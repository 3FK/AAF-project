import React, { Component } from 'react';
import pic from '../../assets/reviwers/reviwer2.jpg';
import {Link} from 'react-router-dom';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User:[],
        };
    };
    componentDidMount(){
        console.log(this.props.match.params.id);
        this.getUser(this.props.match.params.id);
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
                    // for(let item of res.name) {
                        this.state.User.push(res.name);
                    //}
                    this.setState(this.state);
                    console.log(this.state.User);
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
                            View Project
                        </Link>
                    </div>
                    <div>
                        <div className="a font-weight-bold font-italic name">
                            Hi, I'm Muvindu !
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
