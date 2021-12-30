import React from 'react';
import { RenderErrors } from '../RenderErrors/RenderErrors';
import { ArtworkImage } from '../ArtworksIndex/ArtworkImage';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { Link } from 'react-router-dom';

export class AddToCollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      artwork_aic_ids: '',
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      redirect,
      resetRedirect,
      errors,
      resetCollectionErrors,
      aic_id,
      artworkShow,
      fetchArtwork,
      fetchOwnedCollections
    } = this.props;

    // Clear redirect from store when component mounts
    if (redirect) {
      resetRedirect();
    }
    
    // Clear errors from store
    if (Object.keys(errors).length > 0) {
      resetCollectionErrors();
    }

    if (Number.isInteger(aic_id) && aic_id > 0 && aic_id < 999999) {
      this.setState({artwork_aic_ids: [aic_id]});
    }

    if (!artworkShow || artworkShow.id !== aic_id) {
      fetchArtwork(aic_id);
    }

    fetchOwnedCollections();
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
    const { artworkShow, aic_id, imageBaseUrl, collections} = this.props;

    let artwork = null;
    if (artworkShow && artworkShow.id === aic_id && imageBaseUrl) {
      artwork = (
        <div className="add-to-collection-artwork">
          <ArtworkImage
            artwork={artworkShow}
            imageBaseUrl={imageBaseUrl}
          />
          <h3 className="artwork-title">{artworkShow.title}</h3>
        </div>
      );
    } else {
      artwork = (
        <div className="add-to-collection-artwork">
          <LoadingSpinner />
        </div>
      );
    }

    let form = null;
    if (collections && collections.length > 0) {
      form = (
        <div className="form-container add-to-collection-form-container">
          <form onSubmit={this.handleSubmit} className="add-to-collection-form-box">
          {this.renderErrors()}
          <div className="add-to-collection-form">
            <div className="form-group">
              <label htmlFor="form-collections">Choose Collection</label>              
              <select name="collections" id="form-collections" size="4" onChange={this.update('id')}>
                {collections.map((collection, i) =>
                  <option key={`collection-${i}`}
                    value={collection.id}>
                    {collection.title}
                  </option>
                )}
              </select>
            </div>

            <input className="collection-submit btn-primary" type="submit" value="Submit" />
          </div>
        </form>
        </div>
      );
    } else if (collections && collections.length === 0) {
      form = (
        <div className="add-to-collection-form-container">
          <p>You have no collections to add this artwork to. <Link to="/collections/new">Create one first here.</Link></p>
        </div>
      );
    } else {
      form = (
        <div className="add-to-collection-form-container">
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div className="add-to-collection-form">
        <h1 className="header-ruler">Add to Collection</h1>
        {artwork}
        {form}
      </div>
    );
  }
}
