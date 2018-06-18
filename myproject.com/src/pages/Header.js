import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:'',
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if (!localStorage.getItem('jwtToken')) {
            // alert("please login to create project");
            this.setState({
                isLogin:false
            })
        }
        else {
            this.setState({
                isLogin:true
            })
        }
    }
    logout = () => {
        localStorage.clear();
        return (window.location="/")
    };
    // changes nav bar according to the login status
    log = ()=> {
        if (this.state.isLogin===false){
            return (
                <div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink className="nav-link nav-bar-btn-colour" to='/signup'>Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link nav-bar-btn-colour" to='/login' >Login</NavLink>
                        </li>
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink className="nav-link nav-bar-btn-colour" to='/publicProjects'>Public Projects</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link nav-bar-btn-colour" to='/myProjects'>My Projects</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link nav-bar-btn-colour" to='/createProject'>Create Project</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link nav-bar-btn-colour" to='/profile'>Profile Page</NavLink>
                        </li>
                        <li>
                            <button className="btn btn-link nav-bar-btn-colour " onClick={this.logout}>Logout</button>
                        </li>
                    </ul>
                </div>

            )
        }
    };

    render() {
        return (
            <div className="container-fluid col-md-12">
                <nav className="navbar fixed-top navbar-light nav-bar-colour" >
                    <NavLink className="nav-bar-main-btn-colour nav-bar-btn-colour" to='/'>My Project</NavLink>
                        {/*this function call the elements of nav  bar according to the login status*/}
                        {this.log()}

                </nav>
            </div>
        );
    }
}
export default Header;