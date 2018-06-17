import React, { Component } from 'react';
import './css/homePage.css';
import {Link} from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="container-fluid body col-md-12">
                <div id="home">
                    <div className="home-container col-md-10" id="landing">
                        <div className="home-title">
                            Welcome! to My Project
                        </div>
                        <div className="home-text col-md-8">
                            <Link className="home-name" to={'/'}>My Project,</Link><br/>Provide the Most Easiest way to Manage Your Projects<br/>Try it Free
                        </div>
                        <div>
                            <div className="row">
                                <div className="">
                                    <div className="home-text">New to My Project ?</div>
                                    <Link className="btn btn-success home-btn" to={'/signup'}>Sign Up</Link>
                                </div>
                                <div className="">
                                    <div className="home-text">Already have a account</div>
                                    <Link className="btn btn-success home-btn" to={'/login'}>Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
}
export default Home;