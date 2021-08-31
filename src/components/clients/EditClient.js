import React from "react";
import axios from "axios";

class EditClient extends React.Component {
  state = {
    name: this.props.clientDetails.name,
    email: this.props.clientDetails.email,
    phone: this.props.clientDetails.phone,
    address: this.props.clientDetails.address,
    description: this.props.clientDetails.description,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, address, description } = this.state;

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/clients/${this.props.clientDetails._id}`,
        { name, email, phone, address, description },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getData();
        this.props.history.push("/clients");
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <h3>Edit Client</h3>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
            <label htmlFor="floatingInput">Address</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              className="form-control"
              id="floatingInput"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            <label htmlFor="floatingInput">Description</label>
          </div>

          <button type="submit" className="btn btn-primary form-btn">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default EditClient;
