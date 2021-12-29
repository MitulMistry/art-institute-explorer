import React from 'react';
import { RenderErrors } from '../RenderErrors/RenderErrors';
import { ArtworkImage } from '../ArtworksIndex/ArtworkImage';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class AddToCollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection_id: '',
      artwork_ids: '',
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
      fetchArtwork
    } = this.props;

    // Clear redirect from store when component mounts
    if (redirect) {
      resetRedirect();
    }
    
    // Clear errors from store
    if (Object.keys(errors).length > 0) {
      resetCollectionErrors();
    }

    if (!artworkShow || artworkShow.aic_id !== aic_id) {
      fetchArtwork(aic_id)
    }
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
    const { artworkShow, aic_id, imageBaseUrl} = this.props;

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

    return (
      <div className="add-to-collection-form">
        <h1 className="header-ruler">Add to Collection</h1>
        {artwork}
      </div>
    );
  }
}
