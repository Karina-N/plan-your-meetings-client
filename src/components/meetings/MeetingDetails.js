import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

class MeetingDetails extends React.Component {
  //   deleteClient = () => {
  //     const { params } = this.props.match;
  //     axios
  //       .delete(`/clients/:clientId/meetings/:meetingId`, { withCredentials: true })
  //       .then(() => {
  //         this.props.history.push("/clients");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  render() {
    return (
      <>
        <div>
          <h1>{this.props.meetingDetails.date}</h1>
          <h2>{this.props.meetingDetails.title}</h2>
          <p>{this.props.meetingDetails.location}</p>
          {/* <p>{this.props.clientDetails.name}</p> */}
        </div>
        <Link to={"/meetings"}>Back to meetings</Link>
      </>
    );
  }
}

export default MeetingDetails;
