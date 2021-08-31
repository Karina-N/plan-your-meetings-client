import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class MeetingDetails extends React.Component {
  deleteMeeting = () => {
    const { params } = this.props.match;

    axios
      .delete(`${process.env.REACT_APP_API_URL}/clients/:clientId/meetings/${params.id}`, { withCredentials: true })
      .then(() => {
        this.props.history.push("/clients");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getClientId = () => {};

  render() {
    console.log("PROPS IN MEETING", this.props.clientDetails);
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
                <td className="table-titles-column">Description</td>
                <td>{this.props.meetingDetails.description}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Client</td>
                <td>Client contact here</td>
              </tr>
            </tbody>
          </table>

          <div className="buttons-row">
            <button type="button" class="btn btn-primary">
              <Link to={`/meetings/${this.props.meetingDetails._id}/edit`}>Edit Meeting</Link>
            </button>
            {/* <button type="button" class="btn btn-primary" onClick={this.deleteMeeting}>
              Delete Meeting
            </button> */}
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
