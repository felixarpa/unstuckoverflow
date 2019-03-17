import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import logo from '../../unstuckoverflow.svg';
import { HOME, PROFILE } from '../../utils/PageKeys';
import { Storage } from '../../utils/Storage';
import { postUser } from '../../utils/unstuckoverflowClient';
import Loading from '../SmallLoading/Loading';

const STYLES = {
  container: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginTop: '20px',
    marginBottom: '20px',
    height: '50px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  submit: {
    width: '150px',
    marginBottom: '20px',
    marginRight: '5px',
  },
  back: {
    width: '150px',
    marginBottom: '20px',
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
      error: false,
    };
  }

  login = () => {
    const { name, email, phone, password, repeatPassword } = this.state;
    if (repeatPassword === password) {
      const self = this;
      postUser(name, email, phone, password)
        .then((response) => {
          Storage.set(response.id);
          self.props.navigate(PROFILE, {});
        })
        .catch(() => self.setState({loading: false, error: true}));
      this.setState({
        loading: true,
        validated: true,
      });
    } else {
      this.setState({loading: false, error: true});
    }
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
      error,
    } = this.state;

    return (
      <div style={STYLES.container}>
        { loading ? (<Loading />) : (<img src={logo} style={STYLES.logo} alt='logo' />)}
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
            <Form.Control
              required
              type='password'
              placeholder='Password'
              onChange={this.handlePasswordChange}
              value={password}
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Repeat password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Repeat password'
              onChange={this.handleRepeatPasswordChange}
              value={repeatPassword}
            />
          </Form.Group>
          { error ? (<Alert dismissible variant={'danger'}>Invalid form, please review your data</Alert>) : null }
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
