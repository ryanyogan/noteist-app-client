import React, { Component } from 'react';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Noteist</h1>
          <p>Notes that don't suck.</p>
        </div>
      </div>
    );
  }
}
