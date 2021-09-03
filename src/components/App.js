import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import authService from "./services/auth-service";
import Homepage from "./Homepage";
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
    loadingClients: false,
  };

  resetData = () => {
    this.setState({
      isLoggedIn: false,
      user: null,
      loadingClients: [],
    });
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
    this.getAllClients(); // get list of clients
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
        })
        .catch((err) => {
          this.setState({
            user: null,
            isLoggedIn: false,
          });
        });
    }

    this.getAllClients(); // get list of clients
  };

  componentDidMount() {
    this.fetchUserData();
  }

  getAllClients = () => {
    this.setState({
      loadingClients: true,
    });
    axios.get(`${process.env.REACT_APP_API_URL}/clients`, { withCredentials: true }).then((responseFromApi) => {
      this.setState({
        listOfClients: responseFromApi.data,
        loadingClients: false,
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

  sortMeetingsArray = (arr, key) => {
    return arr.sort((a, b) => {
      let x = a[key].toLowerCase();
      let y = b[key].toLowerCase();

      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} resetData={this.resetData} />
        <Switch>
          <Route exact path="/" render={(props) => <Homepage {...props} userIsLoggedIn={this.state.isLoggedIn} />} />
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
                  getData={() => this.getAllClients()}
                  meetingsList={this.getMeetingsList()}
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
              return (
                <ProtectedRoute
                  user={this.state}
                  clientDetails={singleClient}
                  sortMeetingsArray={this.sortMeetingsArray}
                  getData={() => this.getAllClients()}
                  component={ClientDetails}
                />
              );
            }}
          />

          <Route
            exact
            path="/meetings/:id"
            render={(routeProps) => {
              const meetings = this.getMeetingsList();

              const singleMeeting = meetings.find((meeting) => meeting._id === routeProps.match.params.id);
              const singleClient = this.state.listOfClients.find((client) => client._id === singleMeeting?.clientId);
              return (
                <ProtectedRoute
                  user={this.state}
                  meetingDetails={singleMeeting}
                  clientDetails={singleClient}
                  getData={() => this.getAllClients()}
                  meetingsList={this.getMeetingsList()}
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
            loadingClients={this.state.loadingClients}
            component={ClientList}
          />

          <ProtectedRoute
            exact
            path="/meetings"
            user={this.state}
            listOfClients={this.state.listOfClients}
            meetingsList={this.getMeetingsList()}
            getData={() => this.getAllClients()}
            sortMeetingsArray={this.sortMeetingsArray}
            loadingClients={this.state.loadingClients}
            component={MeetingList}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
