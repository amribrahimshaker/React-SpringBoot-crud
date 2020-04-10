import React, { Component } from "react";
import { getCustomers, deleteCustomer } from "./../services/customerService";
import { Link } from "react-router-dom";
import _ from "lodash";
import auth from "../services/authService";

class Customers extends Component {
  state = { data: [], searchQuery: "" };

  columns = [
    { path: "firstName", label: "FirstName" },
    { path: "lastName", label: "LastName" },
    { path: "email", label: "Email" },
  ];

  editColumn = {
    path: "id",
    label: "Id / Edit",
    content: (customer) => (
      <Link to={`/customer/${customer.id}`}>{customer.id}</Link>
    ),
  };

  deleteColumn = {
    key: "delete",
    label: "Delete",
    content: (customer) => (
      <button
        onClick={() => this.handleDelete(customer)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();

    if (user) {
      this.columns.push(this.deleteColumn);
      this.columns.unshift(this.editColumn);
    }

    const { data } = await getCustomers();
    // console.log("data", data.customerList); //data (6) [{…}, {…}, {…}, {…}, {…}, {…}] ---> customerList: Array(13)
    //data[0]: {id: 1, firstName: "Allen", lastName: "Adams", email: "allen@luv2code.com"}

    this.setState({ data: data.customerList });
  }

  handleDelete = async (customer) => {
    const originalCustomers = this.state.data;
    const customers = originalCustomers.filter((c) => c.id !== customer.id);
    this.setState({ data: customers });

    try {
      await deleteCustomer(customer.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      console.error("This Customer has already been deleted.");

      this.setState({ data: originalCustomers });
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    // console.log(this.props); //{history: {…}, location: {…}, match: {…}, staticContext: undefined, user: null}
    const { length: count } = this.state.data;
    const { data: allCustomers, searchQuery } = this.state;

    const { user } = this.props;

    let filtered = allCustomers;
    if (searchQuery) {
      filtered = allCustomers.filter((c) =>
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return (
      <div className="row">
        <div className="col">
          <h1>Customers</h1>

          {user && (
            <Link
              to="/customer/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Customer
            </Link>
          )}
          <p>Showing {count} customers in the database.</p>
          <div>
            <input
              type="text"
              name="query"
              className="form-control"
              placeholder="Search Email ..."
              value={searchQuery}
              style={{ width: "50%" }}
              onChange={(e) => this.handleSearch(e.currentTarget.value)}
            />
          </div>
          <br></br>
          <table className="table">
            <thead>
              <tr>
                {this.columns.map((column) => (
                  <th key={column.path || column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  {this.columns.map((column) => (
                    <td key={this.createKey(item, column)}>
                      {this.renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Customers;
