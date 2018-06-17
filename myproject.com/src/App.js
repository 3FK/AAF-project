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
                    <Route exact path='/EditProfile/:id' component={EditProfile}/>
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/createProject' component={CreateProject}/>
                    <Route exact path='/publicProjects' component={PublicProjects}/>
                    <Route exact path='/projectPage/:id' component={ProjectPage}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
  }
}

export default App;
