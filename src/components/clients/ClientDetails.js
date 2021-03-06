import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class ClientDetails extends React.Component {
  deleteClient = () => {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/clients/${params.id}`, { withCredentials: true })
      .then(() => {
        this.props.getData();
        this.props.history.push("/clients");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submitDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui delete-container">
            <h1>Are you sure?</h1>
            <h3>Deleting Client: {this.props.clientDetails.name} </h3>
            <button className="btn btn-secondary form-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger delete-btn-confirm"
              onClick={() => {
                this.deleteClient();
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    });
  };

  renderLocationIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-geo-alt-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      </svg>
    );
  }

  renderClientDetails = () => {
    return (
      <>
        <h3 className="table-header-client-details">Client Details</h3>
        <div className="client-details-page">
          <div className="details-container client">
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
              </tbody>
            </table>
            <div className="description-row">
              <h6>Description</h6>
              <ReactQuill
                className="description-content"
                value={this.props.clientDetails.description}
                readOnly={true}
                theme={"bubble"}
              />
            </div>

            <div className="buttons-row">
              <button type="button" className="btn btn-primary form-btn">
                <Link to={"/meetings/add"}>Add Meeting</Link>
              </button>
              <button type="button" className="btn btn-primary form-btn">
                <Link to={`/clients/${this.props.clientDetails._id}/edit`}>Edit Client</Link>
              </button>

              <button type="button" className="btn btn-primary form-btn" onClick={this.submitDelete}>
                Delete Client
              </button>
            </div>
            <Link to={"/clients"} className="button-go-back">
              Back to clients
            </Link>
          </div>

          {this.props.clientDetails.meetings.length > 0 && this.renderMeetingDetails()}
        </div>
      </>
    );
  };

  renderMeetingDetails = () => {
    return (
      <div className="client-page-meetings-section">
        {this.props.sortMeetingsArray(this.props.clientDetails.meetings, "date").map((meeting) => (
          <div className="card meeting-card link">
            <div className="card-body">
              <Link to={`/meetings/${meeting._id}`} className="meeting-date-link">
                <h4 className="card-title meeting-date">{this.formatDate(meeting.date)}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">
                <span className="span-icon">{this.renderLocationIcon()}</span>
                {meeting.location}
              </h6>
              <p className="card-text">{meeting.title}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  formatDate(date) {
    let options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    let theDate = new Date(date);
    return theDate.toLocaleDateString("en-US", options);
  }

  render() {
    return <>{this.props.clientDetails && this.renderClientDetails()}</>;
  }
}

export default ClientDetails;
