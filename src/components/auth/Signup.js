// auth/Signup.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";

class Signup extends Component {
  state = { name: "", email: "", password: "", phone: "", business: "", address: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, phone, business, address } = this.state;

    authService
      .signup(name, email, password, phone, business, address)
      .then((createdUser) => {
        this.setState({ name: "", email: "", password: "", phone: "", business: "", address: "" });
        this.props.getUser(createdUser, true);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h2>Register:</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <label>
            Business Field:
            <input type="text" name="business" value={this.state.business} onChange={this.handleChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>

          <button type="submit"> Signup </button>
        </form>

        <p>
          Already have an account?
          <Link to={"/"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
