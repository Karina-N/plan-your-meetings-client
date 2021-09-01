import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";
class Navbar extends React.Component {
  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };

  renderAuthLinks() {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link nav-text" aria-current="page" to="/signup">
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-text" to="/login">
            Login
          </Link>
        </li>
      </>
    );
  }

  renderAllLinks() {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link nav-text" aria-current="page" to="/clients/add">
            New Client
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-text" to="/meetings/add">
            New Meeting
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-text" to="/clients">
            Clients
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-text" to="/meetings">
            Meetings
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link nav-text dropdown-toggle"
            to="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            My Account
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <Link className="dropdown-item" to="/user">
                Details
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/logout">
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </li>
      </>
    );
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-bg">
          <div className="container-fluid">
            {this.props.userIsLoggedIn ? (
              <Link className="navbar-brand" to="/meetings">
                MTA
              </Link>
            ) : (
              <Link className="navbar-brand" to="/login">
                MTA
              </Link>
            )}

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
              <ul className="navbar-nav">
                {/* {this.props.userIsLoggedIn ? "Hello " + this.props.userData.username : ""} */}

                {this.props.userIsLoggedIn ? this.renderAllLinks() : this.renderAuthLinks()}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
