import React, { Component } from 'react';
import { LOADING, HOME, LOGIN, REGISTER, PROFILE } from './PageKeys';
import Loading from './Components/Loading/Loading';

const STYLES = {
  container: {
    height: '300px',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageKey: LOADING,
    };
  }

  componentDidMount() {
    if (this.state.pageKey === LOADING) {
      // TODO: check cookies and go to the needed page

    }
  }

  render() {
    const { pageKey } = this.state;

    let content = (<Loading/>);
    switch (pageKey) {
      case LOGIN:
        content = (<div>LOGIN</div>);
        break;
      case REGISTER:
        content = (<div>REGISTER</div>);
        break;
      case PROFILE:
        content = (<div>PROFILE</div>);
        break;
      case HOME:
        content = (<div>HOME</div>);
        break;
      default:
        content = (<Loading/>);
    }

    return (<div style={STYLES.container}>{content}</div>);
  }
}

export default App;
