import React, { Component } from 'react';
import logo from '../../unstuckoverflow.svg';
import './Loading.css';

const STYLES = {
  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Loading extends Component {
  render() {
    return (
      <div style={STYLES.container}>
        <img src={logo} className='Loading-logo' alt='logo' />
      </div>
    );
  }
}

export default Loading;
