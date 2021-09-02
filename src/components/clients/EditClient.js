import React from "react";
import axios from "axios";
import ReactQuill from "react-quill";

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
        this.props.history.push(`/clients/${this.props.clientDetails._id}`);
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDescriptionChange = (value) => {
    this.setState({ description: value });
  };

  render() {
    return (
      <>
        <form className="form-container" onSubmit={this.handleFormSubmit}>
          <h3>Edit Client</h3>
          <div className="form-floating mb-3">
            <input
              type="text"
              required
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
              required
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
          <span>Description</span>
          <ReactQuill value={this.state.description} onChange={this.handleDescriptionChange} />

          <button type="submit" className="btn btn-primary form-btn">
            Save
          </button>
        </form>
      </>
    );
  }
}

export default EditClient;
