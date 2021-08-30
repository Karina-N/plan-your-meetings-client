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
    console.log(this.props.userData.listOfClients);
    return (
      <div>
        <h2>Create meeting</h2>
        <form key={this.state.title} className="form" onSubmit={this.handleFormSubmit}>
          <select onChange={(e) => this.handleSelection(e)}>
            <option></option>
            {this.props.userData.listOfClients.map((client) => (
              <option name={client.name}>{client.name}</option>
            ))}
          </select>

          <label>
            Date:
            <input type="text" name="date" value={this.state.date} onChange={(e) => this.handleChange(e)} />
          </label>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to={"/meetings"}>Back to clients</Link>
      </div>
    );
  }
}

export default AddMeeting;
