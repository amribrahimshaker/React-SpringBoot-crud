import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import auth from "../services/authService";

class Logout extends Component {
  state = { user: {} };

  componentDidMount() {
    // auth.logout();

    const user = auth.getCurrentUser();
    console.log("userLogout ", user);
    this.setState({ user });

    // window.location = "/";
  }

  logout = () => {
    console.log("logout");
    auth.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className="userDetails-wrapper">
        <div className="details-wrapper">
          <GoogleLogout
            clientId="928991477132-focog2dhh2pve499gt50h9p7u17blpfo.apps.googleusercontent.com"
            render={(renderProps) => (
              <button className="btn btn-primary" onClick={renderProps.onClick}>
                Log Out with Google
              </button>
            )}
            onLogoutSuccess={this.logout}
          />
        </div>
      </div>
    );
  }
}

export default Logout;
