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
    marginTop: '20px',
    marginBottom: '20px',
  }
};

class Home extends Component {
  render() {
    return (
      <div style={STYLES.container}>
        <img src={logo} style={STYLES.logo} alt='logo' />
        <div style={STYLES.buttonsContainer}>
          <Button
            variant='primary'
            style={STYLES.button}
            onClick={() => this.props.navigate(LOGIN, {})}>
            Login
          </Button>
          <Button
            variant='secondary'
            style={STYLES.button}
            onClick={() => this.props.navigate(REGISTER, {})}>
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
