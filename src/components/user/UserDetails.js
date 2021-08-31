import React from "react";
// import axios from "axios";

class UserDetails extends React.Component {
  render() {
    console.log(this.props.user);
    console.log("DATA", this.props.userData.user);

    return (
      <>
        <h3 className="table-header">User Details</h3>
        <div className="details-container">
          <table className="table table-borderless table-background">
            <tbody>
              <tr>
                <td className="table-titles-column">Name</td>
                <td>{this.props.userData.user.username}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Email</td>
                <td>{this.props.userData.user.email}</td>
              </tr>
              <tr>
                <td className="table-titles-column">Address</td>
                <td>{this.props.userData.user.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default UserDetails;
