import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.login();
    }

    login = () => {
        console.log('sss');
        this.setState({
            emailError:'',
            passwordError:''
        })
        fetch("http://192.168.96.1:3001/user/logIn", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
        })
            .then(Response => Response.json())
            .then(res => {
                if (res.success === true) {
                    alert("User Successfully login ");
                }
                else {
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
            <div className="container-fluid body col-md-8">
                <form className="" onSubmit={this.handleSubmit}>
                    <div className="form-group row login">
                        <div >Email :</div>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.emailError}</label>
                    </div>
                    <div className="row">
                        <div >Password :</div>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <label className="text-danger">{this.state.passwordError}</label>
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
                    <button type="submit" className="btn " name="login-button">Log in</button>
                </form>
                <label>{this.state.email}</label><br/>
                <label>{this.state.password}</label><br/>
            </div>
        );
    }
}

export default Login;
