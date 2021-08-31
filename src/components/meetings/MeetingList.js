import React from "react";
import { Link } from "react-router-dom";

class MeetingList extends React.Component {
  renderMeetingsList = () => {
    return this.props.meetingsList.map((meeting) => {
      return (
        <>
          <div className="card meeting-card link">
            <div className="card-body">
              <Link to={`/meetings/${meeting._id}`} className="meeting-card-link">
                <h4 className="card-title">{meeting.date}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">{meeting.location}</h6>
              <p className="card-text">{meeting.title}</p>
              <span className="meeting-card-span">
                <Link className="listed-item">Client contact</Link>
              </span>
            </div>
          </div>
        </>
      );
    });
  };

  render() {
    return (
      <>
        <div>{this.props.meetingsList.length ? this.renderMeetingsList() : "Loading meetings"}</div>
      </>
    );
  }
}

export default MeetingList;
