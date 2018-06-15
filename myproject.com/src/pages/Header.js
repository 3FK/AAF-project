import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {

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
                            <NavLink className="nav-link text-secondary" to='/publicProjects'>My Projects</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-secondary" to='/login'>Login</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Header;