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
        <Link to="/signup">Register</Link>
        <Link to="/">Login</Link>
      </>
    );
  }

  renderAllLinks() {
    return (
      <>
        <div>
          <Link to="/clients/add">Add Client</Link>
          <Link to="/meetings/add">Add Meeting</Link>
          <Link to="/">
            <button onClick={() => this.logoutUser()}>Logout</button>
          </Link>
        </div>
        <div>
          <Link to="/clients">Clients</Link>
          <Link to="/meetings">Meetings</Link>
        </div>
      </>
    );
  }
  render() {
    return (
      <nav className="nav-style">
        {/* {this.props.userIsLoggedIn ? "Hello " + this.props.userData.username : ""} */}

        {this.props.userIsLoggedIn ? this.renderAllLinks() : this.renderAuthLinks()}
      </nav>
    );
  }
}

export default Navbar;
