import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { RenderErrors } from '../RenderErrors/RenderErrors';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false
    };
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
    this.props.processForm(user);
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
    const { redirect } = this.props;

    // Redirect if form has been submitted and redirect path has been
    // set in the Redux store by Collection action.
    if (this.state.submitted && redirect) {
      this.setState({submitted: false});
      return (
        <Navigate to={redirect} replace={true} />
      );
    }

    return (
      <div className="form-container signup-container">
        <div>
          <h1 className="header-ruler">Login</h1>
          <p>Login or <Link to="/signup">click here to create an account</Link></p>
        </div>
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
              <label htmlFor="form-password">Password</label>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="form-input"
                id="form-password"
              />
            </div>

            <input className="signup-submit btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
