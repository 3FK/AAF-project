import React, { Component } from 'react';
import '../css/bootstrap.css';
import '../css/login.css';
class Login extends Component {

    render() {
        return (
            <div className="container-fluid body col-md-8">
                <form className="">
                    <div className="form-group row login">
                        <div >Email :</div>
                        <input className="form-control" type="text" placeholder="Email" id="login-email" name="user-email"/>

                    </div>
                    <div className="row">
                        <div >Password :</div>
                        <input className="form-control" type="password" placeholder="Password" id="login-pass" name="user-password"/>

                    </div>

                    <div className="">
                        <div className="">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label">Remember Me</label>
                        </div>
                        <div className="">
                            <a href="/password-forgot" className="" aria-busy="false">Forgot my password!</a>
                        </div>
                    </div>
                    <button type="button" className="btn " name="login-button">Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;
