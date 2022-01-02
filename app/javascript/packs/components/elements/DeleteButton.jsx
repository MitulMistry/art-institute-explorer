import React from 'react';
import { Navigate } from 'react-router-dom';

export class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.processButton(this.props.id);
    this.setState({submitted: true});
  }

  render() {
    // Redirect if button has been submitted
    let redirectNav = null;
    if(this.state.submitted) {      
      redirectNav = (
        <Navigate to={"/"} />
      );
    }

    return (
      <span>
        <button className="btn-primary-small" onClick={this.handleSubmit}>
          Delete
        </button>
        {redirectNav}
      </span>
    );
  }
}