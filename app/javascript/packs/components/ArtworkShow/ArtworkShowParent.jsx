import React from 'react';
import { useParams } from 'react-router-dom';
import { ArtworkShow } from './ArtworkShow';

// In order to get the route id using React Router v6, need to have a functional component
// for useParams() hook. withRouter doesn't work. So for now, use this parent functional
// component to pass the route id along with props from Redux container.
export default function ArtworkShowParent({artworkShow, imageBaseUrl, fetchArtwork}) {
  const { artworkId } = useParams();

  return (
    <ArtworkShow
      artworkShow={artworkShow}
      imageBaseUrl={imageBaseUrl}
      fetchArtwork={fetchArtwork}
      artworkId={artworkId}
    />
  );
}