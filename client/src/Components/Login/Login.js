import React, { Component } from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import logo from '../../unstuckoverflow.svg';
import { HOME, PROFILE } from '../../utils/PageKeys';
import { Storage } from '../../utils/Storage';
import { login } from '../../utils/unstuckoverflowClient';
import Loading from '../SmallLoading/Loading';

const STYLES = {
  container: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    width: '100px',
    marginBottom: '20px',
    marginRight: '5px',
  },
  back: {
    width: '100px',
    marginBottom: '20px',
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
      error: false,
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity()) {
      const { email, password } = this.state;
      const self = this;
      login(email, password)
        .then((response) => {
          Storage.set(response);
          self.props.navigate(PROFILE, {userId: response});
        })
        .catch(() => self.setState({ loading: false, error: true}));
      this.setState({
        loading: true,
        validated: true,
      });
    }
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
  }


  render() {
    const { validated, email, password, loading, error } = this.state;
    return (
      <div style={STYLES.container}>
        { loading ? (<Loading />) : (<img src={logo} style={STYLES.logo} alt='logo' />)}
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
          { error ? (<Alert dismissible variant={'danger'}>Login failed, try again.</Alert>) : null }
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
