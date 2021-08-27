import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import authService from "./services/auth-service";
import Navbar from "./navbar/Navbar";
import ClientList from "./clients/ClientList";
import ProtectedRoute from "./auth/ProtectedRoute";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((data) => {
          this.setState({
            user: data,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          this.setState({
            user: null,
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <h1>hello</h1>
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <ProtectedRoute exact path="/clients" user={this.state.user} component={ClientList} />
        </Switch>
      </div>
    );
  }
}

export default App;
