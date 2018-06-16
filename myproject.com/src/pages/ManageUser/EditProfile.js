import React, { Component } from 'react';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User:[],
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            password:''
        };
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
                            password:res.name.password
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
        return (
            <div className="container-fluid body col-md-12">
                <div>
                    <div className="col-md-8">
                        <label>{this.state.firstname}</label>
                        <label>{this.state.lastname}</label>
                        <label>{this.state.username}</label>
                        <label>{this.state.email}</label>
                        <label>{this.state.password}</label>
                    </div>
                </div>
            </div>
        )}
}
export default EditProfile;