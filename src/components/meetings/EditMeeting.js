import React from "react";
import axios from "axios";
import ReactQuill from "react-quill";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditMeeting extends React.Component {
  state = {
    date: new Date(this.props.meetingDetails.date),
    title: this.props.meetingDetails.title,
    location: this.props.meetingDetails.location,
    description: this.props.meetingDetails.description,
  };

  setMeetingDate = (newDate) => {
    this.setState({
      date: newDate,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { date, title, location, description } = this.state;
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/clients/${this.props.clientDetails._id}/meetings/${this.props.meetingDetails._id}`,
        { date, title, location, description },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.props.history.push(`/meetings/${this.props.meetingDetails._id}`);
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form className="form-container" onSubmit={this.handleFormSubmit}>
          <h2>Edit Meeting</h2>

          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            defaultValue={"DEFAULT"}
            name="client"
            onChange={(e) => this.handleSelection(e)}
          >
            <option value="DEFAULT">{this.props.clientDetails.name}</option>

            {this.props.userData.listOfClients.map((client) => (
              <option value={client._id}>{client.name}</option>
            ))}
          </select>

          <div className="form-floating mb-3">
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setMeetingDate(date)}
              showTimeSelect
              // minTime={setHours(setMinutes(new Date(), 0), 17)}
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <label htmlFor="floatingInput">Date*</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <label htmlFor="floatingInput">Title*</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="location"
              value={this.state.location}
              onChange={this.handleInputChange}
            />
            <label htmlFor="floatingInput">Location*</label>
          </div>
          <span>Notes</span>
          <ReactQuill value={this.state.description} onChange={this.handleDescriptionChange} />

          <button type="submit" className="btn btn-primary form-btn">
            Save
          </button>
        </form>
      </>
    );
  }
}

export default EditMeeting;