import React, { Component } from 'react';
import './css/SignUp.css';
import map from 'lodash/map';
import countryList from '../countryList';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.match.params.id,
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            password:'',
            firstnameError:'',
            lastnameError:'',
            usernameError:'',
            emailError:'',
            country:'',
            countryError:'',
            description:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit(e) {
        // alert('A name was submitted: ' + this.state.value);
        e.preventDefault();
        this.UpdateUser();
    }
    UpdateUser = () => {
        this.setState({
            firstnameError:'',
            lastnameError:'',
            usernameError:'',
            emailError:'',
            passwordError:''
        });
        fetch("http://192.168.96.1:3001/user/editUser?id="+this.state.id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                email: this.state.email.toLowerCase(),
                country:this.state.country,
                description:this.state.description
            })
        })
            .then(Response => Response.json())
            .then(res => {
                // alert(res.message);
                if (res.success === true) {
                    alert("User Successfully Updated ");
                    return (window.location="/profile/"+this.state.id);
                }
                else {
                    alert("error")
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
                    if (res.errors.country) {
                        this.setState({
                            countryError:res.errors.country.msg
                        });
                    }
                }
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            })
        // .done();
    };
    componentDidMount(){
        console.log(this.props.match.params.id);
        this.getUser(this.props.match.params.id);
    }
    getUser = (id) => {
        fetch("http://localhost:3001/user/findUser?u="+id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                if (res.success === true) {
                    alert('user found');
                    //for(let item of res.name) {
                    //this.state.User.push(res.name);
                        this.setState({
                            firstname:res.name.firstname,
                            lastname:res.name.lastname,
                            username:res.name.username,
                            email:res.name.email,
                            country:res.name.country,
                            description:res.name.description,
                        });
                    //}
                    // this.setState(this.state);
                    // console.log(this.state.User);
                }
                else {
                    alert('user not found');
                }
            });
    };
    render() {
        const options = map(countryList, (val, key) =>
            <option key={key} value={val}>{val}</option>
        );
        return (
            <div className="container-fluid body col-md-12">
                <form className="signUp-form col-md-8" onSubmit={this.handleSubmit}>
                    <label className="text-primary signUp-title">Change Your Details</label>
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
                            value={this.state.lastname}
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
                            value={this.state.username}
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
                            value={this.state.email}
                            // errorText={this.state.emailError}
                            // floatingLabelFixed
                        />
                        <label className="text-danger">{this.state.emailError}</label>
                    </div>
                    <div className="form-group">
                        <div className="signUp-text">Country :</div>
                        <select
                            className="form-control"
                            onChange={this.handleChange}
                            // placeholder="country"
                            id="country"
                            name="country"
                            value={this.state.country}
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
                            value={this.state.description}
                            // errorText={this.state.passwordError}
                            // floatingLabelFixed
                        />
                    </div>
                    <button type="submit" className="btn btn-success" name="login-button">Save Changes</button>
                </form>
                <div>
                    <div className="col-md-8">
                        <label>{this.state.firstname}</label><br/>
                        <label>{this.state.lastname}</label><br/>
                        <label>{this.state.username}</label><br/>
                        <label>{this.state.email}</label><br/>
                        <label>{this.state.password}</label><br/>
                    </div>
                </div>
            </div>
        )}
}
export default EditProfile;