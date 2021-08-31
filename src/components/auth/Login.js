import React, { Component } from "react";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    authService
      .login(email, password)
      .then((response) => {
        this.setState({ email: "", password: "" });
        this.props.getUser(response, true);
        // this.props.history.push("/meetings"); // NOT WORKING YET
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
          <h2>Login Form:</h2>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary form-btn">
            Login
          </button>
        </form>

        <p>
          Don't have account?
          <Link to={"/signup"}>Signup</Link>
        </p>
      </>
    );
  }
}

export default Login;
