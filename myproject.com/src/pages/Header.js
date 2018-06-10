import React, { Component } from 'react';
import '../css/bootstrap.css';

class Header extends Component {

    render() {
        return (
            <div className="container-fluid col-md-12">
                <nav className="navbar fixed-top navbar-light " >
                    <a className="navbar-brand text-secondary" href="#">My Project</a>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="#fat">Public Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-secondary" href="#mdo">My Projects</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-secondary" data-toggle="dropdown" href="#" role="button"
                               aria-haspopup="true" aria-expanded="false">Login</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#one">one</a>
                                <a className="dropdown-item" href="#two">two</a>
                                <div role="separator" className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#three">three</a>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/*<div data-spy="scroll" data-target="#navbar-example2" data-offset="0">*/}
                    {/*<h4 id="fat">@fat</h4>*/}
                    {/*<p>...</p>*/}
                    {/*<h4 id="mdo">@mdo</h4>*/}
                    {/*<p>...</p>*/}
                    {/*<h4 id="one">one</h4>*/}
                    {/*<p>...</p>*/}
                    {/*<h4 id="two">two</h4>*/}
                    {/*<p>...</p>*/}
                    {/*<h4 id="three">three</h4>*/}
                    {/*<p>...</p>*/}
                {/*</div>*/}
            </div>

        );
    }
}

export default Header;