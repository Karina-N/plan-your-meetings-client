import React from "react";
import { Link } from "react-router-dom";

class MeetingList extends React.Component {
  renderMeetingsList = () => {
    return this.props.meetingsList.map((meeting) => {
      return (
        <>
          <div className="card meeting-card link">
            <div key={meeting._id} className="card-body">
              <Link className="meeting-date-link" to={`/meetings/${meeting._id}`}>
                <h4 className="card-title meeting-date ">{this.formatDate(meeting.date)}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">{meeting.location}</h6>
              <p className="card-text">{meeting.title}</p>
              <span className="meeting-card-span">
                <Link to={`/clients/${meeting.clientId}`} className="listed-item">
                  {this.getClientDetails(meeting)}
                </Link>
              </span>
            </div>
          </div>
        </>
      );
    });
  };

  getClientDetails(meeting) {
    let clientObj = this.props.listOfClients.find((client) => {
      return client._id === meeting.clientId;
    });
    return (
      <div>
        <p>{clientObj.name}</p>
        <p>{clientObj.phone}</p>
        <p>{clientObj.email}</p>
      </div>
    );
  }

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

  render() {
    return (
      <>
        <div>{this.props.meetingsList.length ? this.renderMeetingsList() : "Loading meetings"}</div>
      </>
    );
  }
}

export default MeetingList;
