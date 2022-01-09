import { CSRFRequestHeaders } from "./CSRFTokenUtil";

export const fetchCollections = page => (
  fetch(`/api/v1/collections?page=${page || 1}`)
);

export const fetchCollection = id => (
  fetch(`/api/v1/collections/${id}`)
);

export const fetchOwnedCollections = () => (
  fetch('/api/v1/collections/owned')
);

export const createCollection = collection => (
  fetch('/api/v1/collections', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(collection)
  })
);

export const updateCollection = collection => (
  fetch(`/api/v1/collections/${collection.collection.id}`, {
    method: 'PATCH',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(collection)
  })
);

export const deleteCollection = id => (
  fetch(`/api/v1/collections/${id}`, {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);