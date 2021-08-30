import React from "react";
import { Link } from "react-router-dom";
class ClientList extends React.Component {
  renderClients() {
    return this.props.listOfClients.map((client) => {
      return (
        <div key={client._id}>
          <Link to={`/clients/${client._id}`}>
            <h3>{client.name}</h3>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <div>{this.props.listOfClients.length ? this.renderClients() : "Loading clients"}</div>
      </>
    );
  }
}

export default ClientList;
