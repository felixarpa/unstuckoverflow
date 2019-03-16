import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import logo from '../../unstuckoverflow.svg';
import { HOME, PROFILE } from '../../utils/PageKeys';
import {Cookies} from "../../utils/Cookies";

const STYLES = {
  container: {
    height: '600px',
    width: '400px',
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
    width: '150px',
    marginBottom: '5px',
    marginRight: '5px',
  },
  back: {
    width: '150px',
    marginBottom: '5px',
    marginLeft: '5px',
  },
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      name: '',
      email: '',
      phone: '',
      password: '',
      repeatPassword: '',
      loading: false,
    };
  }

  login = () => {
    const {
      name,
      email,
      phone,
      password,
      repeatPassword,
    } = this.state;
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(password);
    console.log(repeatPassword);
    // let cookies = Cookies.get();
    // cookies.userId = 1;
    // Cookies.set(cookies);
    // this.props.navigate(PROFILE, {});
    this.setState({
      loading: true,
      validated: true,
    });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleRepeatPasswordChange = (event) => {
    this.setState({ repeatPassword: event.target.value });
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
    const {
      validated,
      name,
      email,
      phone,
      password,
      repeatPassword,
      loading,
    } = this.state;

    let passwordComponent = (
      <Form.Control
        required
        type='password'
        placeholder='Password'
        onChange={this.handlePasswordChange}
        value={password}
      />
    );

    let repeatPasswordComponent = (
      <Form.Control
        required
        type='password'
        placeholder='Repeat password'
        onChange={this.handleRepeatPasswordChange}
        value={repeatPassword}
      />
    );

    if (validated) {
      if (password.length >= 8) {
        passwordComponent = (
          <Form.Control
            required
            type='password'
            placeholder='Password'
            onChange={this.handlePasswordChange}
            value={password}
            isValid
          />
        );
      } else {
        passwordComponent = (
          <Form.Control
            required
            type='password'
            placeholder='Password'
            onChange={this.handlePasswordChange}
            value={password}
            isInvalid
          />
        );
      }
      if (password === repeatPassword) {
        repeatPasswordComponent = (
          <Form.Control
            required
            type='password'
            placeholder='Repeat password'
            onChange={this.handleRepeatPasswordChange}
            value={repeatPassword}
            isValid
          />
        );
      } else {
        repeatPasswordComponent = (
          <Form.Control
            required
            type='password'
            placeholder='Repeat password'
            onChange={this.handleRepeatPasswordChange}
            value={repeatPassword}
            isInvalid
          />
        );
      }
    }

    return (
      <div style={STYLES.container}>
        <img src={logo} style={STYLES.logo} alt='logo' />
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Group controlId='formBasicName'>
            <Form.Label>Full name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Full name'
              onChange={this.handleNameChange}
              value={name}
            />
          </Form.Group>
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
          <Form.Group controlId='formBasicPhone'>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              required
              type='number'
              placeholder='Phone number'
              onChange={this.handlePhoneChange}
              value={phone}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            {passwordComponent}
            <Form.Text>The password must be at least 8 characters</Form.Text>
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Repeat password</Form.Label>
            {repeatPasswordComponent}
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

export default Register;
