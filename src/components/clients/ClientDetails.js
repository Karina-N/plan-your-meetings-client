import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ClientDetails extends React.Component {
  deleteClient = () => {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/clients/${params.id}`, { withCredentials: true })
      .then(() => {
        this.props.history.push("/clients");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderClientDetails = () => {
    console.log("PROPS", this.props.clientDetails);
    return (
      <>
        <h3 className="table-header">Client Details</h3>
        <div className="details-container">
          <table className="table table-borderless table-background">
            <tbody>
              <tr>
                <td className="table-titles-column">Name</td>
                <td>{this.props.clientDetails.name}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Email</td>
                <td>{this.props.clientDetails.email}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Phone</td>
                <td>{this.props.clientDetails.phone}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Addresss</td>
                <td>{this.props.clientDetails.address}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Description</td>
                <td>{this.props.clientDetails.description}</td>
              </tr>
            </tbody>
          </table>

          <div className="buttons-row">
            <button type="button" class="btn btn-primary">
              <Link to={"/meetings/add"}>Add Meeting</Link>
            </button>
            <button type="button" class="btn btn-primary">
              <Link to={`/clients/${this.props.clientDetails._id}/edit`}>Edit Client</Link>
            </button>
            <button type="button" class="btn btn-primary" onClick={this.deleteClient}>
              Delete client
            </button>
          </div>
          <Link to={"/clients"} className="button-go-back">
            Back to clients
          </Link>
        </div>

        <h3 className="table-header">Meetings</h3>
        {this.props.clientDetails.meetings.map((meeting) => (
          <div className="card meeting-card link">
            <div className="card-body">
              <Link to={`/meetings/${meeting._id}`} className="meeting-card-link">
                <h4 className="card-title">{meeting.date}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">{meeting.location}</h6>
              <p className="card-text">{meeting.title}</p>
            </div>
          </div>
        ))}
      </>
    );
  };

  render() {
    return <>{this.props.clientDetails && this.renderClientDetails()}</>;
  }
}

export default ClientDetails;
