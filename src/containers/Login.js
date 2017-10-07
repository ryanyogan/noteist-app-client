import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

import config from '../config';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID,
    });

    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: () => resolve(),
        onFailure: err => reject(err),
      }),
    );
  }

  _handleChange = event =>
    this.setState({ [event.target.id]: event.target.value });

  _handleSubmit = async event => {
    event.preventDefault();

    try {
      await this.login(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (error) {
      alert(error); // eslint-disable-line
    }
  };

  _validateForm = () =>
    this.state.email.length > 0 && this.state.password.length > 0;

  render() {
    return (
      <div className="Login">
        <form onSubmit={this._handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this._handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this._handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disable={this._validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
