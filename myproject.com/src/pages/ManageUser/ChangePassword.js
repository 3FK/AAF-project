import React, { Component } from 'react';
import './css/login.css';
class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordError:'',
            NewPassword:'',
            NewPasswordError:''
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
        this.changePassword();
    }

    changePassword = () => {
        console.log('sss');
        this.setState({
            passwordError:'',
            NewPasswordError:''
        });
        fetch("http://192.168.96.1:3001/user/changePassword?id="+this.props.match.params.id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: this.state.password,
                NewPassword: this.state.NewPassword
            })
        })
            .then(Response => Response.json())
            .then(res => {
                if (res.success === true) {
                    alert("Your Password Successfully Changed ");
                    return (window.location="/profile");
                }
                else {
                    if (res.errors.email) {
                        this.setState({
                            passwordError:res.errors.password.msg
                        });
                    }
                    if (res.errors.password) {
                        this.setState({
                            NewPasswordError:res.errors.NewPassword.msg
                        });
                    }
                    else {
                        alert(res.errors);
                    }

                }
            })
            .catch((error) => {
                console.log(error);
            })
    };
    render() {
        return (
            <div className="container-fluid body ">
                <form className=" login-from col-md-10" onSubmit={this.handleSubmit}>
                    <label className="text-primary login-title">Change Your Password</label>
                    <div className="form-group row login">
                        <div className="login-text">Current Password :</div>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.passwordError}</label>
                    </div>
                    <div className="row">
                        <div className="login-text">New Password :</div>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="New Password"
                            id="NewPassword"
                            name="NewPassword"
                            value={this.state.NewPassword}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.NewPasswordError}</label>
                    </div>
                    <button type="submit" className="btn btn-success login-btn" name="login-button">Change Password</button>
                </form>
                <label>{this.state.email}</label><br/>
                <label>{this.state.password}</label><br/>
            </div>
        );
    }
}

export default ChangePassword;
