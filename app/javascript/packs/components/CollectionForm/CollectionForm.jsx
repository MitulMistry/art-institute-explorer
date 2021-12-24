import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { RenderErrors } from '../RenderErrors/RenderErrors';

export class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const { errors, resetCollectionErrors } = this.props;
    if (Object.keys(errors).length > 0) {
      resetCollectionErrors();
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
    const collection = Object.assign({}, this.state);
    delete collection.submitted;
    this.props.processForm({"collection": collection});
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
    if (formType == "newCollection") {
      header = (
        <div>
          <h1 className="header-ruler">New Collection</h1>
          <p>Create a new collection of artworks.</p>
        </div>
      );
    } else {
      header = (
        <div>
          <h1 className="header-ruler">Edit Collection</h1>
        </div>
      );
    }

    // Redirect if form has been submitted and redirect path has been
    // set in the Redux store by Collection action.
    if (this.state.submitted && redirect) {
      this.setState({submitted: false});
      resetRedirect();
      return (
        <Navigate to={redirect} replace={true} />
      );
    }

    return (
      <div className="form-container collection-form-container">
        {header}
        <form onSubmit={this.handleSubmit} className="signup-form-box">
          {this.renderErrors()}
          <div className="auth-form">

            <div className="form-group">
              <label htmlFor="form-title">Title</label>
              <input type="text"
                value={this.state.title}
                onChange={this.update('title')}
                className="form-input"
                id="form-title"
              />              
            </div>

            <div className="form-group">
              <label htmlFor="form-description">Description</label>
              <input type="textarea"
                value={this.state.description}
                onChange={this.update('description')}
                className="form-input"
                id="form-description"
              />              
            </div>

            <input className="collection-submit btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}