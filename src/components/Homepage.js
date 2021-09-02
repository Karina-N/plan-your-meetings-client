import React from "react";
import { Redirect, Link } from "react-router-dom";

class Homepage extends React.Component {
  render() {
    if (this.props.userIsLoggedIn) {
      return <Redirect to="/meetings"></Redirect>;
    } else {
      return (
        <h2 className="homepage-welcome-div">
          <Link to="/login" className="homepage-welcome">
            Start Planning
          </Link>
        </h2>
      );
    }
  }
}

export default Homepage;
