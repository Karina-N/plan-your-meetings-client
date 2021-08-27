import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditClient from "./EditClient";

class ClientDetails extends React.Component {
  state = {};

  componentDidMount() {
    this.getSingleClient();
  }

  getSingleClient = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/clients/${params.id}`, { withCredentials: true })
      .then((responseFromApi) => {
        const theClient = responseFromApi.data;
        this.setState(theClient);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (this.state.title) {
      return <EditClient theClient={this.state} getTheClient={this.getSingleClient} />;
    }
  };

  deleteClient = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/clients/${params.id}`, { withCredentials: true })
      .then(() => {
        this.props.history.push("/clients");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log("STATE   ", this.state);
    // console.log("THECLIENT", this.state.theClient);
    return (
      <div>
        <h2>client details here</h2>
        {/* <h1>{this.state.name}</h1>
        <p>{this.state.email}</p> */}

        {this.props.userData._id === this.state.owner && (
          <>
            <div>{this.renderEditForm()} </div>
            <button onClick={this.deleteClient}>Delete client</button>
          </>
        )}

        <Link to={"/clients"}>Back to clients</Link>
      </div>
    );
  }
}

export default ClientDetails;
