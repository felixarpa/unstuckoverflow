import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import logo from '../../unstuckoverflow.svg';
import { HOME, PROFILE } from '../../utils/PageKeys';
import {Cookies} from "../../utils/Cookies";

const STYLES = {
  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  submit: {
    width: '100px',
    marginBottom: '5px',
    marginRight: '5px',
  },
  back: {
    width: '100px',
    marginBottom: '5px',
    marginLeft: '5px',
  },
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      email: '',
      password: '',
      loading: false,
    };
  }

  login = () => {
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    // let cookies = Cookies.get();
    // cookies.userId = 1;
    // Cookies.set(cookies);
    // this.props.navigate(PROFILE, {});
    this.setState({
      loading: true,
      validated: true,
    });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      this.login();
    }
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
  }


  render() {
    const { validated, email, password, loading } = this.state;
    return (
      <div style={STYLES.container}>
        <img src={logo} style={STYLES.logo} alt='logo' />
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter email'
              onChange={this.handleEmailChange}
              value={email}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Password'
              onChange={this.handlePasswordChange}
              value={password}
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            style={STYLES.submit}
            disabled={loading}>
            Submit
          </Button>
          <Button
            variant='secondary'
            style={STYLES.back}
            onClick={() => this.props.navigate(HOME, {})}
            disabled={loading}>
            Back
          </Button>
        </Form>

      </div>
    );
  }
}

export default Login;
