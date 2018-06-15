import React, { Component } from 'react';
// import './css/App.css';
import './css/bootstrap.css';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/SignUp";
import Header from "./pages/Header";
import Home from "./pages/Home";
import CreateProject from "./pages/CreateProject";
import PublicProjects from "./pages/PublicProjects";
import DownshiftMultiple from "./pages/DownshiftMultiple"

class App extends Component {

  render() {
    return (
      <div className="App">
          {/*<h1>Users</h1>*/}
          {/*{this.state.users.map(user =>*/}
              {/*<div key={user.id}>{user.username}</div>*/}
          {/*)}*/}
          <div>
              <Header/>
              {/*<Signup/>*/}
            {/*<Login/>*/}
            {/*<Profile/>*/}
            {/*<Home/>*/}
            {/*<CreateProject/>*/}
              <PublicProjects/>
            {/*<DownshiftMultiple/>*/}
          </div>
      </div>

    );
  }
}

export default App;
