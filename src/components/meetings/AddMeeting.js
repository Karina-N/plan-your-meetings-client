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
        `http://localhost:5000/api/clients/${client}/meetings`,
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
        this.props.history.push("/clients");
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
      <div>
        <h2>Create meeting</h2>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <select defaultValue={"DEFAULT"} name="client" onChange={(e) => this.handleSelection(e)}>
            <option value="DEFAULT" disabled>
              Select Client
            </option>
            {this.props.userData.listOfClients.map((client) => (
              <option value={client._id}>{client.name}</option>
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
