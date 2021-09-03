import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddMeeting extends React.Component {
  state = {
    date: new Date(),
    title: "",
    location: "",
    description: "",
    client: "",
    errorMessage: "",
  };

  setMeetingDate = (newDate) => {
    this.setState({
      date: newDate,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { date, title, location, description, client } = this.state;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/clients/${client}/meetings`,
        { date, title, location, description, client },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.setState({
          date: new Date(),
          title: "",
          location: "",
          description: "",
          client: "",
        });
        this.props.history.push(`/clients/${client}`);
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Please fill all required fields",
        });
      });
  };

  handleClientSelection = (e) => {
    this.setState({
      client: e.target.value,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDescriptionChange = (value) => {
    this.setState({ description: value });
  };

  render() {
    return (
      <>
        <form className="form-container" onSubmit={this.handleFormSubmit}>
          <h2>New meeting</h2>

          {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>}

          <select
            className="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
            defaultValue={"DEFAULT"}
            name="client"
            onChange={(e) => this.handleClientSelection(e)}
          >
            <option value="DEFAULT" disabled>
              Select Client*
            </option>
            {this.props.userData.listOfClients.map((client) => (
              <option value={client._id}>{client.name}</option>
            ))}
          </select>

          <div className="form-floating mb-3">
            <span htmlFor="floatingInput">Date*</span>
            <DatePicker
              className="datepicker-input"
              selected={this.state.date}
              onChange={(date) => this.setMeetingDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              required
              className="form-control"
              id="floatingInput"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Title*</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              required
              className="form-control"
              id="floatingInput"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Location*</label>
          </div>
          <span>Notes</span>
          <ReactQuill
            className="quill-container"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />

          <button type="submit" className="btn btn-primary form-btn ">
            Submit
          </button>
        </form>

        <Link to={"/meetings"} className="button-go-back">
          Back to clients
        </Link>
      </>
    );
  }
}

export default AddMeeting;
