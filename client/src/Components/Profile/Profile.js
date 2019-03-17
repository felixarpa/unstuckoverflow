import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from '../../unstuckoverflow.svg';
import { LOGIN, REGISTER } from '../../utils/PageKeys';

const STYLES = {
  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100px',
  },
  button: {
    width: '100px',
    marginTop: '10px',
  },
  logo: {
    height: '100px',
  }
};

class Profile extends Component {
  render() {
    return (
      <div style={STYLES.container}>
        <img src={logo} style={STYLES.logo} alt='logo' />
      </div>
    );
  }
}

export default Profile;
