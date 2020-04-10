import React from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";

import "./App.css";
class AppLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false,
    };
  }

  responseGoogle = (response) => {
    console.log(response.profileObj);
    this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
  };

  logout = () => {
    this.setState({ isUserLoggedIn: false });
  };

  render() {
    return (
      <div className="App">
        {!this.state.isUserLoggedIn && (
          <GoogleLogin
            clientId="928991477132-focog2dhh2pve499gt50h9p7u17blpfo.apps.googleusercontent.com" //TO BE CREATED
            render={(renderProps) => (
              <button
                className="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        )}

        {this.state.isUserLoggedIn && (
          <div className="userDetails-wrapper">
            <div className="details-wrapper">
              <GoogleLogout
                render={(renderProps) => (
                  <button
                    className="logout-button"
                    onClick={renderProps.onClick}
                  >
                    Log Out
                  </button>
                )}
                onLogoutSuccess={this.logout}
              />

              <div className="image">
                <img src={this.state.userDetails.imageUrl} />
              </div>
              <div className="name">
                Welcome Mr. {this.state.userDetails.givenName}{" "}
                {this.state.userDetails.familyName}
              </div>
              <div className="email">
                <i>{this.state.userDetails.email}</i>
              </div>
            </div>
            <div className="bar" />
            <div className="stand" />
          </div>
        )}
      </div>
    );
  }
}

export default AppLogin;