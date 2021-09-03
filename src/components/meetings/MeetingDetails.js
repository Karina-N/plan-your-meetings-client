import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class MeetingDetails extends React.Component {
  deleteMeeting = () => {
    const { params } = this.props.match;

    axios
      .delete(`${process.env.REACT_APP_API_URL}/clients/${this.props.clientDetails?._id}/meetings/${params.id}`, {
        withCredentials: true,
      })
      .then(() => {
        this.props.getData();
        this.props.history.push(`/clients/${this.props.clientDetails?._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formatDate(date) {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    let theDate = new Date(date);
    return theDate.toLocaleDateString("en-US", options);
  }

  submitDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui delete-container">
            <h1>Are you sure?</h1>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger delete-btn-confirm meeting"
              onClick={() => {
                this.deleteMeeting();
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

  renderContactIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-person-lines-fill"
        viewBox="0 0 16 16"
      >
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
      </svg>
    );
  }

  render() {
    return (
      <>
        <h3 className="table-header">Meeting Details</h3>
        <div className="details-container meeting">
          <table className="table table-borderless table-background">
            <tbody>
              <tr>
                <td className="table-titles-column">Date</td>
                <td>{this.formatDate(this.props.meetingDetails?.date)}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Title</td>
                <td>{this.props.meetingDetails?.title}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Location</td>
                <td>{this.props.meetingDetails?.location}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Client</td>
                <td>
                  <Link className="link-to-client" to={`/clients/${this.props.clientDetails?._id}`}>
                    <span>{this.renderContactIcon()}</span>
                    {this.props.clientDetails?.name}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="description-row">
            <h6>Notes</h6>
            <ReactQuill
              className="description-content"
              value={this.props.meetingDetails?.description}
              readOnly={true}
              theme={"bubble"}
            />
          </div>

          <div className="buttons-row">
            <button type="button" className="btn btn-primary form-btn">
              <Link to={`/meetings/${this.props.meetingDetails?._id}/edit`}>Edit Meeting</Link>
            </button>
            <button type="button" className="btn btn-primary form-btn" onClick={this.submitDelete}>
              Delete Meeting
            </button>
          </div>
          <Link to={"/meetings"} className="button-go-back">
            Back to Meetings
          </Link>
        </div>
      </>
    );
  }
}

export default MeetingDetails;
