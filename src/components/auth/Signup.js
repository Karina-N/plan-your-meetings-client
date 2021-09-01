// auth/Signup.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";

class Signup extends Component {
  state = { name: "", email: "", password: "", address: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, address } = this.state;

    authService
      .signup(name, email, password, address)
      .then((createdUser) => {
        this.setState({ name: "", email: "", password: "", address: "" });
        this.props.getUser(createdUser, true);
        this.props.history.push("/meetings");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <h2>Register:</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Name</label>
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
            <label htmlFor="floatingInput">Email</label>
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
          <div className="form-floating">
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary form-btn">
            Signup
          </button>
        </form>

        <p>
          Already have an account?
          <Link to={"/"}> Login</Link>
        </p>
      </>
    );
  }
}

export default Signup;
