import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  _handleChange = event =>
    this.setState({ [event.target.id]: event.target.value });

  _handleSubmit = event => event.preventDefault();

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
