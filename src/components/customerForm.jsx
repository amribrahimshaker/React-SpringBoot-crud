import React, { Component } from "react";
import Joi from "joi-browser";
import { getCustomer, saveCustomer } from "./../services/customerService";

class CustomerForm extends Component {
  state = {
    data: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    id: Joi.number(),
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string().required().label("email"),
  };

  async componentDidMount() {
    await this.populateCustomer();
  }

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      //   console.log("data..", customerId, customer); // {id: 1, firstName: "Allen", lastName: "Adams", email: "allen@luv2code.com"}

      this.setState({ data: customer });
      //   console.log("state..", this.state);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    // console.log("errors..", errors); //{firstName: "firstName" is not allowed to be empty", lastName: "lastName" is not allowed to be empty"}
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("form submitted..");
    await saveCustomer(this.state.data);

    this.props.history.push("/customers");
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    // console.log(error.details); //[0]: {message: ""firstName" is not allowed to be empty", path: ["firstName"], type: "any.empty", context: {value: "", invalids: Array(1), key: "firstName", label: "firstName"}}
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group required">
            <label className="control-label" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={data["firstName"]}
              onChange={this.handleChange}
              className="form-control"
            />
            {errors["firstName"] && (
              <div className="alert alert-danger">{errors["firstName"]}</div>
            )}
          </div>
          <div className="form-group required">
            <label className="control-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={data["lastName"]}
              onChange={this.handleChange}
              className="form-control"
            />
            {errors["lastName"] && (
              <div className="alert alert-danger">{errors["lastName"]}</div>
            )}
          </div>
          <div className="form-group required">
            <label className="control-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={data["email"]}
              onChange={this.handleChange}
              className="form-control"
            />
            {errors["email"] && (
              <div className="alert alert-danger">{errors["email"]}</div>
            )}
          </div>

          <button disabled={this.validate()} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
