import React from 'react';
import { Link } from 'react-router-dom';

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      bio: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    let links = null;
    if (this.props.formType == "signUp") {
      links = (
        <p>Create a new account or <Link to="/sessions/new">click here to login</Link></p>
      );
    }

    return (
      <div className="form-container signup-container">
        {links}
        <form onSubmit={this.handleSubmit} className="signup-form-box">
          {this.renderErrors()}
          <div className="auth-form">
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
                value={this.state.passwordConfirmation}
                onChange={this.update('passwordConfirmation')}
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
