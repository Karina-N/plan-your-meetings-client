import React from "react";
import { Link } from "react-router-dom";
class ClientList extends React.Component {
  state = {
    searchInput: "",
  };

  handleSearchInput = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  renderClients = () => {
    const { searchInput } = this.state;

    const filteredClients = this.props.listOfClients.filter((client) =>
      client.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return this.sortClientsArray(filteredClients, "name").map((client) => {
      return (
        <div key={client._id}>
          <li className="list-group-item client-list d-flex justify-content-between align-items-center">
            <Link className="listed-item" to={`/clients/${client._id}`}>
              <h3>{client.name}</h3>
            </Link>
            {client.meetings.length > 0 && (
              <span className="badge bg-primary rounded-pill">{client.meetings.length}</span>
            )}
          </li>
        </div>
      );
    });
  };

  sortClientsArray(arr, key) {
    return arr.sort((a, b) => {
      let x = a[key].toLowerCase();
      let y = b[key].toLowerCase();

      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  // messageForListLoading = () => {
  //   if (this.props.listOfClients.length === 0) {
  //     return <p>You have no clients yet</p>;
  //   } else {
  //     return <p>Loading clients</p>;
  //   }
  // };

  render() {
    return (
      <>
        <input
          className="form-control form-control-sm me-2 search-input"
          type="search"
          placeholder="Search Clients"
          aria-label="Search"
          onChange={(e) => this.handleSearchInput(e)}
        />

        <div>
          {this.props.listOfClients.length ? (
            <ul className="list-group list-group-flush">{this.renderClients()}</ul>
          ) : (
            "Loading clients"
          )}
        </div>
      </>
    );
  }
}

export default ClientList;
