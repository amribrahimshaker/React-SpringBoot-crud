import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Customers from "./components/customers";
import CustomerForm from "./components/customerForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Switch>
            <Route path="/customer/:id" component={CustomerForm} />
            <Route path="/customers" component={Customers} />

            <Redirect from="/" exact to="/customers" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
