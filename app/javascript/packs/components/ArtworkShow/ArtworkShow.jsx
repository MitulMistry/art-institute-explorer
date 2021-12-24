import React from 'react';
import { ArtworkImage } from '../ArtworksIndex/ArtworkImage';
import { LoadingSpinner } from '../elements/LoadingSpinner';

export class ArtworkShow extends React.Component {
  componentDidMount() {
    // Dispatch Redux action to fetch Artwork via API call
    const { fetchArtwork, artworkId } = this.props;
    fetchArtwork(artworkId);
  }

  render() {
    const { artworkShow, artworkId, imageBaseUrl} = this.props;

    if (artworkShow && artworkShow.id === artworkId && imageBaseUrl) {
      return (
        <div className="artwork-show">
          <ArtworkImage
            artwork={artworkShow}
            imageBaseUrl={imageBaseUrl}
          />
          <h1>{artworkShow.title}</h1>
          <p>Date: {artworkShow.date_display}</p>
          <p>Artist: {artworkShow.artist_display}</p>
          <p>Place of Origin: {artworkShow.place_of_origin}</p>
          <p>Medium: {artworkShow.medium_display}</p>
          <p>Dimensions: {artworkShow.dimensions}</p>
          <p>Provenance: {artworkShow.provenance_text}</p>
        </div>
      );
    } else {
      return (
        <div className="artwork-show">
          <LoadingSpinner />
        </div>
      );
    }
  }
}