import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

class MeetingDetails extends React.Component {
  deleteMeeting = () => {
    const { params } = this.props.match;

    axios
      .delete(`${process.env.REACT_APP_API_URL}/clients/${this.props.clientDetails._id}/meetings/${params.id}`, {
        withCredentials: true,
      })
      .then(() => {
        this.props.getData();
        this.props.history.push("/meetings");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h3 className="table-header">Meeting Details</h3>
        <div className="details-container">
          <table className="table table-borderless table-background">
            <tbody>
              <tr>
                <td className="table-titles-column">Date</td>
                <td>{this.props.meetingDetails.date}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Title</td>
                <td>{this.props.meetingDetails.title}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Location</td>
                <td>{this.props.meetingDetails.location}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Client</td>
                <td>
                  <Link to={`/clients/${this.props.clientDetails._id}`}>{this.props.clientDetails.name}</Link>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="description-row">
            <h6>Notes</h6>
            <ReactQuill
              className="description-content"
              value={this.props.meetingDetails.description}
              readOnly={true}
              theme={"bubble"}
            />
          </div>

          <div className="buttons-row">
            <button type="button" className="btn btn-primary">
              <Link to={`/meetings/${this.props.meetingDetails._id}/edit`}>Edit Meeting</Link>
            </button>
            <button type="button" className="btn btn-primary" onClick={this.deleteMeeting}>
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
