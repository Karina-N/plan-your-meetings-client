// auth/Signup.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";

class Signup extends Component {
  state = { name: "", email: "", password: "", address: "", errorMessage: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, address } = this.state;

    authService
      .signup(name, email, password, address)
      .then((createdUser) => {
        this.setState({ name: "", email: "", password: "", address: "" });
        this.props.getUser(createdUser, true);
        this.props.history.push("/clients");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          name: "",
          email: "",
          password: "",
          address: "",
          errorMessage: error.response.data.errorMessage,
        });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <h2>Sign up:</h2>

          {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>}

          <div className="form-floating mb-3">
            <input
              type="text"
              required
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
              required
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
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingPassword">Password*</label>
          </div>

          <button type="submit" className="btn btn-primary form-btn">
            Signup
          </button>
        </form>

        <p>
          Already have an account?
          <Link to={"/login"}> Login</Link>
        </p>
      </>
    );
  }
}

export default Signup;
