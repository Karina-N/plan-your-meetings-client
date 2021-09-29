import React from "react";
import { Link } from "react-router-dom";

class MeetingList extends React.Component {
  renderMeetingsList = () => {
    return this.props.sortMeetingsArray(this.props.meetingsList, "date").map((meeting) => {
      return (
        <>
          <div className="card meeting-card link">
            <div key={meeting._id} className="card-body">
              <Link className="meeting-date-link" to={`/meetings/${meeting._id}`}>
                <h4 className="card-title meeting-date ">{this.formatDate(meeting.date)}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">
                <span className="span-icon">{this.renderLocationIcon()}</span>
                {meeting.location}
              </h6>
              <p className="card-text">{meeting.title}</p>
              <Link to={`/clients/${meeting.clientId}`} className="listed-item">
                {this.getClientDetails(meeting)}
              </Link>
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
      <div className="meeting-client-details">
        <span>{this.renderContactIcon()}</span>
        <p>{clientObj.name}</p>
        <p>{clientObj.phone}</p>
        <p>{clientObj.email}</p>
      </div>
    );
  }

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

  // CALENDAR ICON

  // renderCalendarIcon() {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="16"
  //       height="16"
  //       fill="currentColor"
  //       class="bi bi-calendar-event"
  //       viewBox="0 0 16 16"
  //     >
  //       <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
  //       <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
  //     </svg>
  //   );
  // }

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

  renderLinkFirstMeeting() {
    return (
      <div className="add-first-client-div">
        <Link to="/clients/add" className="add-first-client">
          <h2>First add a client</h2>
        </Link>
      </div>
    );
  }

  messageIfUserLoggedIn() {
    return this.props.loadingClients ? "Loading meetings" : this.renderLinkFirstMeeting();
  }

  render() {
    const todayDate = this.formatDate(new Date());

    return (
      <>
        <h6 className="today-date">{todayDate}</h6>
        <div>
          {this.props.listOfClients.length ? (
            this.props.meetingsList.length ? (
              <ul className="list-group list-group-flush">{this.renderMeetingsList()}</ul>
            ) : (
              <div className="add-first-client-div">
                <Link to="/meetings/add" className="add-first-client">
                  <h2>Add your first meeting</h2>
                </Link>
              </div>
            )
          ) : (
            this.messageIfUserLoggedIn()
          )}
        </div>
      </>
    );
  }
}

export default MeetingList;
