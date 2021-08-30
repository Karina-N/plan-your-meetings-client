import React from "react";
import { Link } from "react-router-dom";

class MeetingList extends React.Component {
  renderMeetingsList = () => {
    return this.props.meetingsList.map((meeting) => {
      return (
        <div>
          <Link to={`/meetings/${meeting._id}`}>
            <h3>{meeting.title}</h3>
          </Link>
        </div>
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
