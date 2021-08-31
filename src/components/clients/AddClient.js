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
      <>
        <form onSubmit={this.handleFormSubmit}>
          <h2>Create client</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label for="floatingInput">Name*</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label for="floatingInput">Email*</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <label for="floatingInput">Phone</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
            <label for="floatingInput">Address</label>
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
            <label for="floatingInput">Description</label>
          </div>

          <button type="submit" className="btn btn-primary form-btn">
            Submit
          </button>
        </form>
        <Link to={"/clients"}>Back to clients</Link>
      </>
    );
  }
}

export default AddClient;
