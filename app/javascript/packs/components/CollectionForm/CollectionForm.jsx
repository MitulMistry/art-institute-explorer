import React from 'react';
import { Navigate } from 'react-router-dom';
import { RenderErrors } from '../RenderErrors/RenderErrors';
import { ArtworkImage } from '../ArtworksIndex/ArtworkImage';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      artwork_ids: [],
      submitted: false,
      loaded: false
    };
    this.loadCollectionToState = this.loadCollectionToState.bind(this);
    this.updateArtworks = this.updateArtworks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  componentDidMount() {
    const {
      redirect,
      resetRedirect,
      errors,
      resetCollectionErrors,
      formType,
      collection,
      collectionId,
      fetchCollection,
      fetchSavedArtworks } = this.props;

    // Clear redirect from store when component mounts
    if (redirect) {
      resetRedirect();
    }

    // Clear errors from store
    if (Object.keys(errors).length > 0) {
      resetCollectionErrors();
    }

    // Dispatch Redux action to fetch Artworks via API call
    fetchSavedArtworks();

    // Make API call to load Collection to edit if it isn't
    // already loaded in Redux store
    if (formType === "editCollection" && collection.id !== collectionId) {
      fetchCollection(collectionId);
    }
  }

  loadCollectionToState() {
    const { collection } = this.props;
    const artworkIds = collection.artworks.map(artwork => (
      artwork.id
    ));

    this.setState({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      artwork_ids: artworkIds,
      loaded: true
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Add or remove selected artwork_id from state's array
  updateArtworks(e) {
    this.setState(prevState => {
      const value = parseInt(e.target.attributes.value.value);
      const index = prevState.artwork_ids.indexOf(value);
      if (index > -1) {
        let ids = [...prevState.artwork_ids];
        ids.splice(index, 1);
        return {artwork_ids: ids};
      } else {
        let ids = [...prevState.artwork_ids];
        ids.push(value);
        return {artwork_ids: ids};
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const collection = Object.assign({}, this.state);
    delete collection.submitted;
    delete collection.loaded;
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
    const { formType, redirect } = this.props;

    // Redirect if form has been submitted and redirect path has been
    // set in the Redux store by Collection action.
    if (this.state.submitted && redirect) {
      this.setState({submitted: false});
      return (
        <Navigate to={redirect} replace={true} />
      );
    }

    let header = null;
    if (formType === "newCollection") {
      header = (
        <div>
          <h1 className="header-ruler">New Collection</h1>
          <p className="top-description">Create a new collection of artworks.</p>
        </div>
      );
    } else {
      header = (
        <div>
          <h1 className="header-ruler">Edit Collection</h1>
        </div>
      );
    }

    let collectionArtworks = null;
    if (formType === "editCollection") {
      const { collection, collectionId } = this.props;

      if (collection && collection.id === collectionId && collection.artworks.length > 0) {
        
        if (!this.state.loaded) {
          this.loadCollectionToState();
        }
        
        collectionArtworks = (
          <div>
            <h3 className="artworks-title">Collection Artworks</h3>
            <p className="artworks-description">Click to remove currently selected artworks from the collection.</p>
            <div className="artworks-grid">
              <div className="cards-container masonry-with-columns-small">
                {collection.artworks.map((artwork, i) =>
                  <ArtworkImage
                    key={`collection-artwork-${i}`}
                    artwork={artwork}
                    value={artwork.id}
                    onClick={this.updateArtworks}
                    active={this.state.artwork_ids.includes(artwork.id)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      } else {
        collectionArtworks = (
          <div>
            <h3 className="artworks-title">Collection Artworks</h3>
            <LoadingSpinner />
          </div>
        );
      }
    }

    let savedArtworks = null;
    const { savedArtworksArray } = this.props;

    if (savedArtworksArray && savedArtworksArray.length > 0) {
      savedArtworks = (
        <div>
          <h3 className="artworks-title">Saved Artworks</h3>
          <p className="artworks-description">Select from your previously saved artworks to add to this collection.</p>
          <div className="artworks-grid">
            <div className="cards-container masonry-with-columns-small">
              {savedArtworksArray.map((artwork, i) => {
                if (formType === "newCollection" || (formType === "editCollection" && !this.props.collection.artworks.some(cArtwork => cArtwork.id === artwork.id))) {
                  return (
                    <ArtworkImage
                      key={`saved-artwork-${i}`}
                      artwork={artwork}
                      value={artwork.id}
                      onClick={this.updateArtworks}
                      active={this.state.artwork_ids.includes(artwork.id)}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="form-container collection-form-container">
        {header}
        <form onSubmit={this.handleSubmit} className="new-collection-form-box">
          {this.renderErrors()}
          <div className="collection-form">

            <div className="form-group text">
              <label htmlFor="form-title">Title</label>
              <input type="text"
                value={this.state.title}
                onChange={this.update('title')}
                className="form-input"
                id="form-title"
              />
            </div>

            <div className="form-group text">
              <label htmlFor="form-description">Description</label>
              <input type="textarea"
                value={this.state.description}
                onChange={this.update('description')}
                className="form-input"
                id="form-description"
              />
            </div>

            {collectionArtworks}

            {savedArtworks}

            <div className="text">
              <input className="collection-submit btn-primary" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}