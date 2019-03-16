import React, { Component } from 'react';
import { LOADING, HOME, LOGIN, REGISTER, PROFILE } from './PageKeys';
import Loading from './Components/Loading/Loading';
import Home from './Components/Home/Home';
import { Cookies } from './Cookies';

const STYLES = {
  container: {
    minHeight: '300px',
    minWidth: '300px',
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
      const cookies = Cookies.get();
      const { userId } = cookies;
      this.setState(userId ? {
        pageKey: PROFILE,
        userId: userId
      } : {
        pageKey: HOME,
      });
    }
  }

  navigate = (pageKey, params) => {
    this.setState({
      pageKey,
      ...params,
    });
  };

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
        content = (<Home navigate={this.navigate}/>);
        break;
      default:
        content = (<Loading/>);
    }

    return (<div style={STYLES.container}>{content}</div>);
  }
}

export default App;
