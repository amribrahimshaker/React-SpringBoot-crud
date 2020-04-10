import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Customers from "./components/customers";
import CustomerForm from "./components/customerForm";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";

import auth from "./services/authService";
import Logout from "./components/logout";
import Profile from "./components/profile";

class App extends Component {
  state = {};
  componentDidMount() {
    // const user = localStorage.getItem("currentUser");
    // console.log("user", user);
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/customer/:id" component={CustomerForm} />

            <Route path="/profile" component={Profile} />
            <Route
              path="/customers"
              render={(props) => <Customers {...props} user={user} />}
            ></Route>

            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/customers" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
