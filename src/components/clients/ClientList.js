import React from "react";
import { Link } from "react-router-dom";
class ClientList extends React.Component {
  renderClients() {
    return this.props.listOfClients.map((client) => {
      return (
        <div key={client._id}>
          <li className="list-group-item d-flex justify-content-between align-items-center">
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
  }

  render() {
    return (
      <>
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
