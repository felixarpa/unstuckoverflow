import React, { Component } from 'react';
import { LOADING, HOME, LOGIN, REGISTER, PROFILE } from './utils/PageKeys';
import { Cookies } from './utils/Cookies';
import Loading from './Components/Loading/Loading';
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import Profile from "./Components/Profile/Profile";

const STYLES = {
  container: {
    minHeight: '300px',
    minWidth: '300px',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    Cookies.set({});
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
        content = (<Login navigate={this.navigate}/>);
        break;
      case REGISTER:
        content = (<Register navigate={this.navigate}/>);
        break;
      case PROFILE:
        content = (<Profile navigate={this.navigate}/>);
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
