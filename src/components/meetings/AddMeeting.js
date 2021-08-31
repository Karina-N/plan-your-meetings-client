import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AddMeeting extends React.Component {
  state = {
    date: "",
    title: "",
    location: "",
    client: "",
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { date, title, location, client } = this.state;
    console.log("NEW STATE", this.state);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/clients/${client}/meetings`,
        { date, title, location },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.setState({
          date: "",
          title: "",
          location: "",
          client: "",
        });
        this.props.history.push(`/meetings`);
      })
      .catch((error) => console.log(error));
  };

  handleSelection = (e) => {
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

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <h2>New meeting</h2>

          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            defaultValue={"DEFAULT"}
            name="client"
            onChange={(e) => this.handleSelection(e)}
          >
            <option value="DEFAULT" disabled>
              Select Client
            </option>
            {this.props.userData.listOfClients.map((client) => (
              <option value={client._id}>{client.name}</option>
            ))}
          </select>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Location*</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="floatingInput"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>

          <button type="submit" className="btn btn-primary form-btn">
            Submit
          </button>
        </form>

        <Link to={"/meetings"}>Back to clients</Link>
      </>
    );
  }
}

export default AddMeeting;
