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
      bio: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.resetSessionErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
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
    const { formType, redirect, resetRedirect } = this.props;
    
    let header = null;
    if (formType == "signUp") {
      header = (
        <div>
          <h1 className="header-ruler">Sign Up</h1>
          <p>Create a new account or <Link to="/sessions/new">click here to login</Link></p>
        </div>
      );
    } else {
      header = (
        <div>
          <h1 className="header-ruler">Edit Account</h1>
        </div>
      );
    }

    if (redirect) {
      resetRedirect();
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
              <label htmlFor="form-password">Password</label>
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
              <input type="textarea"
                value={this.state.bio}
                onChange={this.update('bio')}
                className="form-input"
                id="form-bio"
              />              
            </div>

            <input className="signup-submit btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
