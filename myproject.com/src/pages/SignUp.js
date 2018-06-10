import React, { Component } from 'react';
import '../css/bootstrap.css';
import '../css/login.css';
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

    handleChange(u) {
        this.setState({[u.target.name]: u.target.value});

    }
    handleSubmit(u) {
        // alert('A name was submitted: ' + this.state.value);
        u.preventDefault();
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
                email: this.state.email,
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
                        this.setState({firstnameError:res.errors.firstname.msg,})
                    }
                    if (res.errors.lastname) {
                        this.setState({lastnameError:res.errors.lastname.msg,})
                    }
                    if (res.errors.username) {
                        this.setState({usernameError:res.errors.username.msg,})
                    }
                    if (res.errors.email) {
                        this.setState({emailError:res.errors.email.msg,})
                    }
                    if (res.errors.password) {
                        this.setState({ passwordError:res.errors.password.msg,})
                    }
                    // this.setState({})
                    console.log(res.errors);
                }
            })
            .catch((error) => {

                console.log(error.errors);
            })
            // .done();
    };

    render() {
        return (
            <div className="container-fluid body col-md-8">
                <form className="login" onSubmit={this.handleSubmit}>
                    <div className="form-group row ">
                        <div >First Name :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="first name"
                            id="firstname"
                            name="firstname"
                        />
                    </div>
                    <div className="form-group row ">
                        <div >Last Name :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="last name"
                            id="lastname"
                            name="lastname"
                        />
                    </div>
                    <div className="form-group row ">
                        <div >User Name :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="user name"
                            id="username"
                            name="username"
                        />
                    </div>
                    <div className="form-group row ">
                        <div >Email :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Email"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="row">
                        <div >Password :</div>
                        <input
                            className="form-control"
                            onChange={this.handleChange}
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                        />
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

                <label>{this.state.firstnameError}</label><br/>
                <label>{this.state.lastnameError}</label><br/>
                <label>{this.state.usernameError}</label><br/>
                <label>{this.state.emailError}</label><br/>
                <label>{this.state.passwordError}</label><br/>
            </div>
        );
    }
}

export default SignUp;
