import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

class AddClient extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, description } = this.state;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/clients`,
        { name, email, phone, address, description },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.setState({ name: "", email: "", phone: "", address: "", description: "" });
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

  handleDescriptionChange = (value) => {
    this.setState({ description: value });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <h2>New client</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Name*</label>
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
            <label htmlFor="floatingInput">Email*</label>
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
            <label htmlFor="floatingInput">Phone</label>
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
            <label htmlFor="floatingInput">Address</label>
          </div>
          <span>Description</span>
          <ReactQuill value={this.state.description} onChange={this.handleDescriptionChange} />

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
