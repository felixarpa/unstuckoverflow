import React, { Component } from 'react';
import logo from '../../unstuckoverflow.svg';
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead';
import {
  getSkills,
  deleteSkill,
  postSkill,
  getTag,
} from '../../utils/unstuckoverflowClient';
import {Button} from "react-bootstrap";

const AsyncTypeahead = asyncContainer(Typeahead);

const STYLES = {
  container: {
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
    height: '50px',
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      options: [],
      skills: [],
      selected: '',
      userId: this.props.userId
    };
  }

  search = (query) => {
    this.setState({ loading: true });
    getTag(query)
      .then(response =>
        this.setState({
          loading: false,
          options: response,
        })
      );
  };

  delete = (id) => {
    const { skills } = this.state;
    this.setState({ loading: true });
    deleteSkill(this.state.userId, id)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          skills: skills.filter(skill =>
            skill.id !== id
          )
        });
      })
      .catch(() =>
        this.setState({ error: true })
      );
  };

  addSkill = () => {
    const { skills } = this.state;
    this.setState({ loading: true });
    const { userId, selected } = this.state;
    postSkill(userId, selected)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          // options: response,
        });
      })
      .catch(() =>
        this.setState({ error: true })
      );
  };

  componentDidMount() {
    getSkills(this.state.userId)
      .then(response =>
        this.setState({
          loading: false,
          skills: response
        })
      )
      .catch(() =>
        this.setState({
          loading: false,
          error: true,
        })
      );
  }

  render() {
    const { skills, options, loading } = this.state;
    const tags = skills.map(skill => {
      return (
        <p
          key={skill.id}
          onClick={() => this.delete(skill.id)}
      >{skill.name}</p>);
    });
    return (
      <div style={STYLES.container}>
        <img src={logo} style={STYLES.logo} alt='logo'/>
        {tags}
        <AsyncTypeahead
          isLoading={loading}
          onSearch={this.search}
          options={options.map(x => x.name)}
          onChange={(e) => {
            console.log('onChange');
            console.log(e[0]);
            this.setState({
              selected: e[0]
            });
          }}
        />
        <Button
          onClick={() => this.addSkill(this.state.selected)}
        >Add skill</Button>
      </div>
    );
  }
}

export default Profile;
