import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";

import auth from "../services/authService";

class LoginForm extends Component {
  //   state = {
  //     userDetails: {},
  //     isUserLoggedIn: false,
  //     error: {},
  //   };

  responseGoogle = (response) => {
    console.log(response.profileObj); //{googleId: "112282724051448954909", imageUrl: "https://lh6.googleusercontent.com/-Up3Ioh3U-Cg/AAA…AKWJJOBkumNrtiG5YnGw9I_Z44L9AWXBA/s96-c/photo.jpg", email: "amr.ibrahem.shaker@gmail.com", name: "Amr Shaker", givenName: "Amr", …}
    // this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });

    auth.login(response.profileObj);
    window.location = "/";
  };

  responseGoogleFailure = (response) => {
    console.log(response); //{error: "popup_closed_by_user"}
    const error = { ...this.state.error };
  };

  render() {
    // const { error } = this.state;

    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <GoogleLogin
          clientId="928991477132-focog2dhh2pve499gt50h9p7u17blpfo.apps.googleusercontent.com" //TO BE CREATED
          render={(renderProps) => (
            <div>
              <button
                className="btn btn-primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Log in with Google
              </button>
            </div>
          )}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogleFailure}
        />
      </div>
    );
  }
}

export default LoginForm;
