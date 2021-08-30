import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ClientDetails extends React.Component {
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
    return (
      <>
        {this.props.clientDetails && (
          <div>
            <h1>{this.props.clientDetails.name}</h1>
            <p>{this.props.clientDetails.email}</p>

            {this.props.clientDetails.meetings.map((meeting) => (
              <p>{meeting.title}</p>
            ))}

            <div>
              <Link to={`/clients/${this.props.clientDetails._id}/edit`}>Edit Client</Link>
              <button onClick={this.deleteClient}>Delete client</button>
              <Link to={"/clients"}>Back to clients</Link>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ClientDetails;
