import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddClient from "./AddClient";

class ClientList extends React.Component {
  state = {
    listOfClients: [],
  };

  componentDidMount() {
    this.getAllClients();
  }

  getAllClients = () => {
    axios.get(`http://localhost:5000/api/clients`, { withCredentials: true }).then((responseFromApi) => {
      this.setState({
        listOfClients: responseFromApi.data,
      });
    });
  };

  renderClients() {
    return this.state.listOfClients.map((client) => {
      return (
        <div key={client._id}>
          <Link to={`/clients/${client._id}`}>
            <h3>{client.name}</h3>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <div>{this.state.listOfClients.length ? this.renderClients() : "Loading Client List"}</div>
        <hr />
        {this.props.userIsLoggedIn ? ( // ERROR HERE (kazkodel false grazina)
          <AddClient getData={() => this.getAllClients()} />
        ) : (
          <p>Login to create clients</p>
        )}
      </>
    );
  }
}

export default ClientList;
