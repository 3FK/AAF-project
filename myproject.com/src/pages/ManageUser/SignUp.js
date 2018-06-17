import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/SignUp.css';
import map from 'lodash/map';

import countryList from '../countryList';

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
            passwordError:'',
            country:'',
            countryError:'',
            description:''
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
        return (window.location="/login");
    }

    register = () => {
        this.setState({
            firstnameError:'',
            lastnameError:'',
            usernameError:'',
            emailError:'',
            passwordError:'',
            countryError:'',
        });
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
                password: this.state.password,
                country:this.state.country,
                description:this.state.description
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
                    if (res.errors.country) {
                        this.setState({
                            countryError:res.errors.country.msg
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
        const options = map(countryList, (val, key) =>
            <option key={key} value={val}>{val}</option>
        );
        return (
            <div className="container-fluid body ">
                <form className="signUp-form col-md-8" onSubmit={this.handleSubmit}>
                    <label className="text-primary signUp-title">Register Your Self</label>
                    <div className="form-group ">
                        <div className="signUp-text">First Name :</div>
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
                        <div className="signUp-text">Last Name :</div>
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
                        <div className="signUp-text">User Name :</div>
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
                        <div className="signUp-text">Email :</div>
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
                        <div className="signUp-text">Password :</div>
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
                    <div className="form-group">
                        <div className="signUp-text">Country :</div>
                        {/*<input*/}
                            {/*className="form-control"*/}
                            {/*onChange={this.handleChange}*/}
                            {/*type="text"*/}
                            {/*placeholder="country"*/}
                            {/*id="country"*/}
                            {/*name="country"*/}
                            {/*// errorText={this.state.passwordError}*/}
                            {/*// floatingLabelFixed*/}
                        {/*/>*/}
                        <select
                            className="form-control"
                            onChange={this.handleChange}
                            // placeholder="country"
                            id="country"
                            name="country"
                        >
                            <option value="" disabled>Choose your Country</option>
                            {options}

                        </select>
                        <label className="text-danger">{this.state.countryError}</label>
                    </div>
                    <div className="form-group">
                        <div className="signUp-text">Description :</div>
                        <textarea
                            className="form-control"
                            onChange={this.handleChange}
                            rows="4"
                            type="text"
                            placeholder="description"
                            id="description"
                            name="description"
                            // errorText={this.state.passwordError}
                            // floatingLabelFixed
                        />
                    </div>
                    <div className="">
                        <div className="">
                            <p  className="signUp-text">already have a account. <Link to='/login' className="" aria-busy="false">sign in</Link></p>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" name="login-button">Sign Up</button>
                </form>
                <label>{this.state.firstname}</label><br/>
                <label>{this.state.lastname}</label><br/>
                <label>{this.state.username}</label><br/>
                <label>{this.state.email}</label><br/>
                <label>{this.state.country}</label><br/>
            </div>
        );
    }
}

export default SignUp;
