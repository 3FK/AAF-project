import React, { Component } from 'react';
import './css/SignUp.css';
// import TextField from '@material-ui/core/TextField';
class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname:  '',
            firstnameError:'',
            lastname: '',
            lastnameError:'',
            username: '',
            usernameError:'',
            email: '',
            emailError:'',
            password: '',
            passwordError:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});

    }
    handleSubmit(e) {
        // alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        this.register();
    }

    register = () => {
        this.setState({
            firstnameError:'',
            lastnameError:'',
            usernameError:'',
            emailError:'',
            passwordError:''
        })
        fetch("http://192.168.96.1:3001/user/signUp", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
        })
            .then(Response => Response.json())
            .then(res => {
                // alert(res.message);
                if (res.success === true) {
                    alert("User Successfully Registered ");
                }
                else {
                    if (res.errors.firstname) {
                        this.setState({
                            firstnameError:res.errors.firstname.msg
                        });
                    }
                    if (res.errors.lastname) {
                        this.setState({
                            lastnameError:res.errors.lastname.msg
                        });
                    }
                    if (res.errors.username) {
                        this.setState({
                            usernameError:res.errors.username.msg
                        });
                    }
                    if (res.errors.email) {
                        this.setState({
                            emailError:res.errors.email.msg
                        });
                    }
                    if (res.errors.password) {
                        this.setState({
                            passwordError:res.errors.password.msg
                        });
                    }
                    // this.setState({})
                    // console.log(res.errors);
                }
            })
            .catch((error) => {

                console.log(error);
            })
            // .done();
    };

    render() {
        return (
            <div className="container-fluid body ">
                <form className="login col-md-8" onSubmit={this.handleSubmit}>
                    <div className="form-group ">
                        <div >First Name :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="first name"
                            id="firstname"
                            name="firstname"
                            value={this.state.firstname}
                            // errorText={this.state.firstnameError}
                            // floatingLabelFixed
                        />
                        <label className="text-danger">{this.state.firstnameError}</label>
                    </div>
                    <div className="form-group ">
                        <div >Last Name :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="last name"
                            id="lastname"
                            name="lastname"
                            // errorText={this.state.lastnameError}
                            // floatingLabelFixed
                        />
                        <label className="text-danger">{this.state.lastnameError}</label>
                    </div>
                    <div className="form-group ">
                        <div >User Name :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="user name "
                            id="username"
                            name="username"
                            // errorText={this.state.usernameError}
                            // floatingLabelFixed
                        />
                        <label className="text-danger">{this.state.usernameError}</label>
                    </div>
                    <div className="form-group ">
                        <div >Email :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Email"
                            id="email"
                            name="email"
                            // errorText={this.state.emailError}
                            // floatingLabelFixed
                        />
                        <label className="text-danger">{this.state.emailError}</label>
                    </div>
                    <div className="form-group">
                        <div >Password :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            // errorText={this.state.passwordError}
                            // floatingLabelFixed
                        />
                        <label className="text-danger">{this.state.passwordError}</label>
                    </div>
                    <div className="">
                        <div className="">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="form-check-label">Allow Notification</label>
                        </div>
                        <div className="">
                            <p>already have a account. <a href="/password-forgot" className="" aria-busy="false">sign in</a></p>
                        </div>
                    </div>
                    <button type="submit" className="btn " name="login-button">Sign Up</button>
                </form>
                <label>{this.state.firstname}</label><br/>
                <label>{this.state.lastname}</label><br/>
                <label>{this.state.username}</label><br/>
                <label>{this.state.email}</label><br/>
                <label>{this.state.password}</label><br/>
            </div>
        );
    }
}

export default SignUp;
