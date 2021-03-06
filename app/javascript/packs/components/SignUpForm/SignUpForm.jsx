import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { RenderErrors } from '../RenderErrors/RenderErrors';

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      bio: '',
      submitted: false,
      loaded: false
    };
    this.loadUserToState = this.loadUserToState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const { redirect, resetRedirect, errors, resetSessionErrors } = this.props;
    // Clear redirect from store when component mounts
    if (redirect) {
      resetRedirect();
    }

    // Clear errors from store
    if (Object.keys(errors).length > 0) {
      resetSessionErrors();
    }
  }

  loadUserToState() {
    const { user } = this.props;

    this.setState({
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user.bio,
      loaded: true
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const user = Object.assign({}, this.state);
    delete user.submitted;
    delete user.loaded;
    
    if (this.props.formType === "editProfile" && user.password === "") {
      delete user.password;
      delete user.password_confirmation;
    }
    this.props.processForm({"user": user});
  }

  renderErrors() {
    return(
      <div>
      <RenderErrors
        errors={this.props.errors}
      />
      </div>
    );
  }

  render() {
    const { formType, redirect } = this.props;
    
    let header = null;
    if (formType === "signUp") {
      header = (
        <div>
          <h1 className="header-ruler">Sign Up</h1>
          <p>Create a new account or <Link to="/login">click here to login</Link></p>
        </div>
      );
    } else {
      header = (
        <div>
          <h1 className="header-ruler">Edit Account</h1>
        </div>
      );
    }

    let passwordNotice = null;
    if (formType === "editProfile") {
      passwordNotice = (
        <i> (Leave password blank if you want it unchanged.)</i>
      );
      
      const { user } = this.props;

      if (user && !this.state.loaded) {
        this.loadUserToState();
      }
    }

    // Redirect if form has been submitted and redirect path has been
    // set in the Redux store by Collection action.
    if (this.state.submitted && redirect) {
      return (
        <Navigate to={redirect} replace={true} />
      );
    }

    return (
      <div className="form-container signup-container">
        {header}
        <form onSubmit={this.handleSubmit} className="signup-form-box">
          {this.renderErrors()}
          <div className="auth-form">

            <div className="form-group">
              <label htmlFor="form-email">Email</label>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="form-input"
                id="form-email"
              />              
            </div>

            <div className="form-group">
              <label htmlFor="form-username">Username</label>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="form-input"
                id="form-username"
              />              
            </div>

            <div className="form-group">              
              <label htmlFor="form-password">Password{passwordNotice}</label>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="form-input"
                id="form-password"
              />              
            </div>

            <div className="form-group">
              <label htmlFor="form-password-confirmation">Password Confirmation</label>
              <input type="password"
                value={this.state.password_confirmation}
                onChange={this.update('password_confirmation')}
                className="form-input"
                id="form-password-confirmation"
              />              
            </div>

            <div className="form-group">
              <label htmlFor="form-bio">Bio</label>
              <textarea
                value={this.state.bio}
                onChange={this.update('bio')}
                className="form-input"
                id="form-bio"
                rows="3"
              />              
            </div>

            <input className="signup-submit btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
