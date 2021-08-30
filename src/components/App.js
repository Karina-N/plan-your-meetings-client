import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import authService from "./services/auth-service";
import Navbar from "./navbar/Navbar";
import ClientList from "./clients/ClientList";
import ClientDetails from "./clients/ClientDetails";
import AddClient from "./clients/AddClient";
import AddMeeting from "./meetings/AddMeeting";
import EditClient from "./clients/EditClient";
import ProtectedRoute from "./auth/ProtectedRoute";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    listOfClients: [],
    listOfMeetings: [],
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
    this.getAllClients();
  }

  getAllClients = () => {
    axios.get(`http://localhost:5000/api/clients`, { withCredentials: true }).then((responseFromApi) => {
      this.setState({
        listOfClients: responseFromApi.data,
      });
    });
  };

  getAllMeetings = () => {
    axios.get(`http://localhost:5000/api/meetings`, { withCredentials: true }).then((responseFromApi) => {
      this.setState({
        listOfMeetings: responseFromApi.data,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <Route
            exact
            path="/clients/:id/edit"
            render={(routeProps) => {
              const singleClient = this.state.listOfClients.find((client) => client._id === routeProps.match.params.id);
              return (
                <ProtectedRoute
                  user={this.state}
                  clientDetails={singleClient}
                  getData={() => this.getAllClients()}
                  component={EditClient}
                />
              );
            }}
          />

          <Route
            exact
            path="/clients/add"
            render={(routeProps) => {
              return <ProtectedRoute user={this.state} getData={() => this.getAllClients()} component={AddClient} />;
            }}
          />

          <Route
            exact
            path="/meetings/add"
            render={(routeProps) => {
              return <ProtectedRoute user={this.state} getData={() => this.getAllClients()} component={AddMeeting} />;
            }}
          />

          <Route
            exact
            path="/clients/:id"
            render={(routeProps) => {
              const singleClient = this.state.listOfClients.find((client) => client._id === routeProps.match.params.id);
              return <ProtectedRoute user={this.state} clientDetails={singleClient} component={ClientDetails} />;
            }}
          />

          <ProtectedRoute
            exact
            path="/clients"
            user={this.state}
            listOfClients={this.state.listOfClients}
            component={ClientList}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
