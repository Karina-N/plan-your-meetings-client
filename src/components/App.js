import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import authService from "./services/auth-service";
import Navbar from "./navbar/Navbar";
import ClientList from "./clients/ClientList";
import MeetingList from "./meetings/MeetingList";
import ClientDetails from "./clients/ClientDetails";
import MeetingDetails from "./meetings/MeetingDetails";
import AddClient from "./clients/AddClient";
import AddMeeting from "./meetings/AddMeeting";
import EditClient from "./clients/EditClient";
import EditMeeting from "./meetings/EditMeeting";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserDetails from "./user/UserDetails";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    listOfClients: [],
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  fetchUserData = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((data) => {
          this.setState({
            user: data,
            isLoggedIn: true,
          });

          this.getAllClients(); // get list of clients
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
    this.fetchUserData();
  }

  getAllClients = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/clients`, { withCredentials: true }).then((responseFromApi) => {
      this.setState({
        listOfClients: responseFromApi.data,
      });
    });
  };

  getMeetingsList = () => {
    let meetings = [];
    for (const client of this.state.listOfClients) {
      for (const meeting of client.meetings) {
        meeting.clientId = client._id;
        meetings.push(meeting);
      }
    }
    return meetings;
  };

  render() {
    return (
      <div className="App">
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <ProtectedRoute exact path="/user" user={this.state} component={UserDetails} />

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
            path="/meetings/:id/edit"
            render={(routeProps) => {
              const singleMeeting = this.getMeetingsList().find(
                (meeting) => meeting._id === routeProps.match.params.id
              );
              const singleClient = this.state.listOfClients.find((client) => client._id === singleMeeting.clientId);
              return (
                <ProtectedRoute
                  user={this.state}
                  meetingDetails={singleMeeting}
                  clientDetails={singleClient}
                  component={EditMeeting}
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

          <Route
            exact
            path="/meetings/:id"
            render={(routeProps) => {
              const singleMeeting = this.getMeetingsList().find(
                (meeting) => meeting._id === routeProps.match.params.id
              );
              const singleClient = this.state.listOfClients.find((client) => client._id === singleMeeting.clientId);
              return (
                <ProtectedRoute
                  user={this.state}
                  meetingDetails={singleMeeting}
                  clientDetails={singleClient}
                  getData={() => this.getAllClients()}
                  component={MeetingDetails}
                />
              );
            }}
          />

          <ProtectedRoute
            exact
            path="/clients"
            user={this.state}
            listOfClients={this.state.listOfClients}
            component={ClientList}
          />

          <ProtectedRoute
            exact
            path="/meetings"
            user={this.state}
            listOfClients={this.state.listOfClients}
            meetingsList={this.getMeetingsList()}
            component={MeetingList}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
