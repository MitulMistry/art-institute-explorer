import React from 'react';
import { useParams } from 'react-router-dom';

import { AddToCollectionForm } from './AddToCollectionForm';

// In order to get the route id using React Router v6, need to have a functional component
// for useParams() hook. withRouter doesn't work. So for now, use this parent functional
// component to pass the route id along with props from Redux container.
export default function AddToCollectionParent(props) {
  const { artworkId } = useParams();
  const aic_id = parseInt(artworkId);

  return (
    <AddToCollectionForm
      aic_id={aic_id}
      {...props}
    />
  );
}