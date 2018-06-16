import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    log = ()=> {
        if (this.state.isLogin===false){
            return (
                <div>
                    <NavLink className="nav-link text-secondary" to='/login' >Login</NavLink>
                </div>
            )
        }
        else {
            return (
                <div>
                    <NavLink className="nav-link text-secondary" to='/login'>Logout</NavLink>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="container-fluid col-md-12">
                <nav className="navbar fixed-top navbar-light " >
                    <NavLink className="navbar-brand text-secondary" to='/'>My Project</NavLink>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink className="nav-link text-secondary" to='/publicProjects'>Public Projects</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-secondary" to='/createProject'>My Projects</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-secondary" to='/signup'>Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-secondary" to='/projectPage'>Project Page</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-secondary" to='/profile'>Profile Page</NavLink>
                        </li>
                        <li>
                            {this.log()}
                            {/*<NavLink className="nav-link text-secondary" to='/login' >Login</NavLink>*/}
                            {/*<NavLink className="nav-link text-secondary" to='/logout' hidden={this.state.isLogin}>Logout</NavLink>*/}
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Header;