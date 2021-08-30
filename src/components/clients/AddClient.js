import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class AddClient extends React.Component {
  state = {
    name: "",
    email: "",
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email } = this.state;

    axios
      .post("http://localhost:5000/api/clients", { name, email }, { withCredentials: true })
      .then(() => {
        this.props.getData();
        this.setState({ name: "", email: "" });
        this.props.history.push("/clients");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <h2>Create client</h2>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
          </label>
          <label>
            Email:
            <textarea name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to={"/clients"}>Back to clients</Link>
      </div>
    );
  }
}

export default AddClient;
