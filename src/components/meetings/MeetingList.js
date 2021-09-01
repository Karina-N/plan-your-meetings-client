import React from "react";
import { Link } from "react-router-dom";

class MeetingList extends React.Component {
  renderMeetingsList = () => {
    return this.props.meetingsList.map((meeting) => {
      return (
        <>
          <div className="card meeting-card link">
            <div key={meeting._id} className="card-body">
              <Link to={`/meetings/${meeting._id}`} className="meeting-card-link">
                <h4 className="card-title">{meeting.date}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">{meeting.location}</h6>
              <p className="card-text">{meeting.title}</p>
              <span className="meeting-card-span">
                <Link to={`/clients/${meeting.clientId}`} className="listed-item">
                  {this.getClientName(meeting)}
                </Link>
              </span>
            </div>
          </div>
        </>
      );
    });
  };

  getClientName(meeting) {
    let clientObj = this.props.listOfClients.find((client) => {
      return client._id === meeting.clientId;
    });
    return clientObj.name;
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
