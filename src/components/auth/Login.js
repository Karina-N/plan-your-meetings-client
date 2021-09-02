import React, { Component } from "react";
import authService from "../services/auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "", errorMessage: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    authService
      .login(email, password)
      .then((response) => {
        this.setState({ email: "", password: "" });
        this.props.getUser(response, true);
        this.props.history.push("/meetings"); // need to get the updated list of clients (eg. calling the method getAllClients() of App)
      })
      .catch((error) => {
        this.setState({ errorMessage: "Your email or password is incorrect" });
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
          <h2>Login Form:</h2>

          {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>}

          <div className="form-floating mb-3">
            <input
              type="email"
              required
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              required
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
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
