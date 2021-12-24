import React from 'react';
import { useParams } from 'react-router-dom';
import { CollectionShow } from './CollectionShow';

// In order to get the route id using React Router v6, need to have a functional component
// for useParams() hook. withRouter doesn't work. So for now, use this parent functional
// component to pass the route id along with props from Redux container.
export default function ArtworkShowParent({collectionShow, fetchCollection}) {
  const { collectionId } = useParams();

  return (
    <CollectionShow
      collectionShow={collectionShow}
      fetchCollection={fetchCollection}
      collectionId={parseInt(collectionId)}
    />
  );
}