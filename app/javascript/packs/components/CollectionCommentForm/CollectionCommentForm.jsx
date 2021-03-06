import React from 'react';
import { Navigate } from 'react-router-dom';
import { RenderErrors } from '../RenderErrors/RenderErrors';

export class CollectionCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection_id: '',
      body: '',
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const { 
      redirect,
      resetRedirect,
      errors,
      resetCollectionCommentErrors,
      collectionId,
      formType,
      comment } = this.props;

    // Clear redirect from store when component mounts
    if (redirect) {
      resetRedirect();
    }
    
    // Clear errors from store
    if (Object.keys(errors).length > 0) {
      resetCollectionCommentErrors();
    }

    if (formType === 'newCollectionComment') {
      this.setState({collection_id: collectionId});
    } else if (formType === 'editCollectionComment') {
      this.setState({
        collection_id: collectionId,
        id: comment.id,
        body: comment.body
      });
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
    const collectionComment = Object.assign({}, this.state);
    delete collectionComment.submitted;
    this.props.processForm({"collection_comment": collectionComment});
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
    const { formType, redirect, resetRedirect, errors } = this.props;
    
    let header = null;
    let label = null;
    if (formType === 'newCollectionComment') {
      header = (
        <div>
          <h3>New Comment</h3>
        </div>
      );
    } else {
      label = 'Edit Comment';
    }

    if (this.state.submitted && redirect && errors.length === 0) {
      if (formType === 'newCollectionComment') {
        this.setState({submitted: false, body: ''});
        resetRedirect();
      } else if (formType === 'editCollectionComment') {
        // Toggle edit state in parent component
        this.setState({submitted: false});
        resetRedirect();
        this.props.toggleEdit();
      }
    }

    return (
      <div className="form-container collection-comment-form-container">
        {header}
        <form onSubmit={this.handleSubmit} className="collection-comment-form-box">
          {this.renderErrors()}
          <div className="comment-form">

            <div className="form-group">
              <label htmlFor="form-body">{label || 'Comment'}</label>
              <textarea
                value={this.state.body}
                onChange={this.update('body')}
                className="form-input"
                id="form-body"
                rows="3"
              />
            </div>

            <input className="collection-comment-submit btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}