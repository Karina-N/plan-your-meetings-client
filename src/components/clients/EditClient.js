import React from "react";
import axios from "axios";

class EditClient extends React.Component {
  state = {
    name: this.props.clientDetails.name,
    email: this.props.clientDetails.email,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, email } = this.state;

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/clients/${this.props.clientDetails._id}`,
        { name, email },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.props.history.push("/clients");
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit Client</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default EditClient;
