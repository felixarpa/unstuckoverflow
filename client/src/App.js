import React, { Component } from 'react';
import { LOADING, HOME, LOGIN, REGISTER, PROFILE } from './utils/PageKeys';
import Loading from './Components/Loading/Loading';
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import { Storage } from './utils/Storage';

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
      Storage.get((res) => {
        this.setState(res.userId && res.userId !== '' ? {
          pageKey: PROFILE,
          userId: res.userId
        } : {
          pageKey: HOME,
        });
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
    const { pageKey, userId } = this.state;

    let content = (<Loading/>);
    switch (pageKey) {
      case LOGIN:
        content = (<Login navigate={this.navigate}/>);
        break;
      case REGISTER:
        content = (<Register navigate={this.navigate}/>);
        break;
      case PROFILE:
        content = (<Profile navigate={this.navigate} userId={userId}/>);
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
