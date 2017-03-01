import React, {PropTypes, Component} from 'react';
import {graphql, compose} from 'react-apollo';
import RegisterForm from './RegisterForm';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import toastr from 'toastr';
import * as userActions from './../../actions/userActions';

class RegisterPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      userDetails: Object.assign({}, this.props.userDetails),
      errors: {}
    };

    this.updateRegisterDetails = this.updateRegisterDetails.bind(this);
    this.register = this.register.bind(this);
  }

  updateRegisterDetails(event) {
    const field = event.target.name;
    let userDetails = this.state.userDetails;
    userDetails[field] = event.target.value;
    return this.setState({userDetails});
  }

  registerFormIsValid() {
    let formIsValid = true;
    let errors = {};
    const {username, password, repeatPassword} = this.state.userDetails;

    if (username.length < 4) {
      errors.username = 'Username must be at least 4 characters.';
      formIsValid = false;
    }

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
      formIsValid = false;
    }

    if (password != repeatPassword) {
      errors.repeatPassword = 'Repeat password must match password.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  register(event) {
    event.preventDefault();

    if (!this.registerFormIsValid()) {
      return;
    }

    const {username, password} = this.state.userDetails;
    this.props.mutate({
      variables: {
        username: username,
        password: password
      }
    }).then(() => {
      toastr.success('Registered successfully!');
      this.props.router.push('');
    }).catch((error) => {
      toastr.error(error);
    });
  }

  render() {
    return (
      <div>
        <RegisterForm actionName="Register" action={this.register} details={this.state.userDetails} onChange={this.updateRegisterDetails} errors={this.state.errors}/>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  mutate: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  actions: PropTypes.shape({setUser: PropTypes.func.isRequired}),
  router: PropTypes.object.isRequired
};

const registerMutation = gql `
mutation createUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password)
}`;

function mapStateToProps(state, ownProps) {

  let userDetails = {
    username: '',
    password: ''
  };

  return {userDetails};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default compose(graphql(registerMutation), connect(mapStateToProps, mapDispatchToProps))(RegisterPage);
