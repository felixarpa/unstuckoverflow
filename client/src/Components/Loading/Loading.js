import React, { Component } from 'react';
import logo from './unstuckoverflow.svg';
import './Loading.css';

class Loading extends Component {
  render() {
    return (<img src={logo} className="Loading-logo" alt="logo" />);
  }
}

export default Loading;
