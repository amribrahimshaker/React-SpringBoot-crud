import React, { Component } from "react";
import authService from "../services/authService";

class Profile extends Component {
  state = { user: {} };

  componentDidMount() {
    // auth.logout();

    const user = authService.getCurrentUser();
    // console.log("userLogout ", user);
    this.setState({ user });

    // window.location = "/";
  }
  render() {
    return (
      <React.Fragment>
        <div className="image">
          <img src={this.state.user.imageUrl} />
        </div>
        <div className="name">
          Welcome {this.state.user.givenName} {this.state.user.familyName}!
        </div>
        <div className="email">
          <i>{this.state.user.email}</i>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
