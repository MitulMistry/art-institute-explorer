import { CSRFRequestHeaders } from "./CSRFTokenUtil";

export const createCollectionLike = collectionLike => (
  fetch('/api/v1/collection_likes', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(collectionLike)
  })
);

export const deleteCollectionLike = collection_id => (
  fetch(`/api/v1/collection_likes/collection_id/${collection_id}`, {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);