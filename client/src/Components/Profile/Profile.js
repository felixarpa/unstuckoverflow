import React, { Component } from 'react';
import logo from '../../unstuckoverflow.svg';
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead';
import { Cookies } from '../../utils/Cookies';
import {
  getSkills,
  deleteSkill,
  postSkill,
  getTag,
} from '../../utils/unstuckoverflowClient';
import { Alert, Button } from 'react-bootstrap';
import Loading from '../SmallLoading/Loading';
import {HOME} from "../../utils/PageKeys";

const AsyncTypeahead = asyncContainer(Typeahead);

const STYLES = {
  container: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: '100px',
    marginTop: '10px',
  },
  logoutButton: {
    width: '100px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  button: {
    width: '100px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  logo: {
    height: '50px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  skill: {
    width: '360px',
    marginBottom: '5px',
  },
};

const VARIANTS = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
];

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

  error = () => this.setState({ error: true, loading: false });

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
      .then(() =>
        this.setState({
          loading: false,
          skills: skills.filter(skill =>
            skill.id !== id
          )
        })
      )
      .catch(this.error);
  };

  addSkill = () => {
    const { skills } = this.state;
    this.setState({ loading: true });
    const { userId, selected } = this.state;
    postSkill(userId, selected)
      .then((response) => {
        this.setState({
          loading: false,
          skills: [
            ...skills,
            response.tag,
          ],
        });
      })
      .catch(this.error);
  };

  componentDidMount() {
    getSkills(this.state.userId)
      .then(response =>
        this.setState({
          loading: false,
          skills: response,
        })
      )
      .catch(this.error);
  }

  render() {
    const { skills, options, loading, error } = this.state;
    const tags = skills.map((skill, index) => {
      return (
        <Alert
          style={STYLES.skill}
          key={skill.id}
          dismissible
          variant={VARIANTS[index % VARIANTS.length]}
          onClose={() => this.delete(skill.id)}>
          {skill.name}
        </Alert>
      );
    });
    return (
      <div style={STYLES.container}>
        { loading ? (<Loading/>) : (<img src={logo} style={STYLES.logo} alt='logo' />)}
        { error ? (
          <Alert
            dismissible
            variant={'alert'}
            onClose={() => this.setState({ error: false })}>
            Something went wrong
          </Alert>) :
          null
        }
        {tags}
        <AsyncTypeahead
          stule={STYLES.input}
          isLoading={loading}
          onSearch={this.search}
          options={options.map(x => x.name)}
          onChange={(e) => {
            this.setState({
              selected: e[0]
            });
          }}
        />
        <Button
          style={STYLES.button}
          onClick={() => this.addSkill(this.state.selected)}
        >Add skill</Button>
        <Button
          variant='secondary'
          style={STYLES.button}
          onClick={() => {
            Cookies.set({});
            this.props.navigate(HOME, {});
          }}
        >Logout</Button>
      </div>
    );
  }
}

export default Profile;
