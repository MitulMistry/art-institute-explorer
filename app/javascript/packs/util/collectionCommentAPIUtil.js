import { CSRFRequestHeaders } from "./CSRFTokenUtil";

export const createCollectionComment = collectionComment => (
  fetch('/api/v1/collection_comments', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(collectionComment)
  })
);

export const updateCollectionComment = collectionComment => (
  fetch(`/api/v1/collection_comments/${collectionComment.id}`, {
    method: 'PATCH',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(collectionComment)
  })
);

export const deleteCollectionComment = id => (
  fetch(`/api/v1/collection_comments/${id}`, {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);