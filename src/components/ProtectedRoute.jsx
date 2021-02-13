import React from "react";
import {withRouter, Redirect, Route} from "react-router-dom";
import {withCookies} from "react-cookie";

class ProtectedRoute extends React.Component {
  isAuthenticated() {
    const token = this.props.cookies.get("token");

    if (!token) {
      return false;
    }

    return true;
  }

  render() {
    const Comp = this.props.component;

    return this.isAuthenticated() ? (
      <Route {...this.props} component={Comp} />
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withCookies(withRouter(ProtectedRoute));
