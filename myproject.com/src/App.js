import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './css/App.css';
import './pages/css/app.css'
import Login from "./pages/ManageUser/Login";
import Profile from "./pages/ManageUser/Profile";
import EditProfile from "./pages/ManageUser/EditProfile";
import Signup from "./pages/ManageUser/SignUp";
import Header from "./pages/Header";
import Home from "./pages/Home";
import CreateProject from "./pages/ManageProjects/CreateProject";
import PublicProjects from "./pages/ManageProjects/PublicProjects";
import Error from './pages/Error';
import ProjectPage from "./pages/ManageProjects/ProjectPage";
import MyProjects from "./pages/ManageProjects/MyProjects";
import EditProjects from "./pages/ManageProjects/EditProject";
import ChangePassword from "./pages/ManageUser/ChangePassword";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/profile/:id' component={Profile}/>
                    <Route exact path='/EditProfile/:id' component={EditProfile}/>
                    <Route exact path='/ChangePassword/:id' component={ChangePassword}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/createProject' component={CreateProject}/>
                    <Route exact path='/publicProjects' component={PublicProjects}/>
                    <Route exact path='/projectPage/:id' component={ProjectPage}/>
                    <Route exact path='/editProject/:id' component={EditProjects}/>
                    <Route exact path='/myProjects' component={MyProjects}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
