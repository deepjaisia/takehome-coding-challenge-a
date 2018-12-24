import React, { Component } from 'react';

class Nav extends Component {
  
  render() {
  return (
        <nav className="navbar navbar-expand-lg bg--accent">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <span className="navbar-brand"><h2 className="margin-0">EY<label className="text--thin margin-0" style={{ fontSize: "60%" }}> &nbsp;Acquisition Tracker</label></h2></span>
          <span className="mr-auto"></span>
        </div>
      </nav>
    )
  }
}

export default Nav;