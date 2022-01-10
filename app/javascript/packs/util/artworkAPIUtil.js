export const fetchArtworks = page => (
  fetch(`/api/v1/artworks?page=${page || 1}`)
);

export const fetchSavedArtworks = page => (
  fetch(`/api/v1/artwork_saves?page=${page || 1}`)
);

export const fetchArtwork = id => (
  fetch(`/api/v1/artworks/${id}`)
);

export const searchArtworks = (queryString, page) => (
  fetch(`/api/v1/artworks/search?q=${encodeURIComponent(queryString)}&page=${page || 1}`)
);