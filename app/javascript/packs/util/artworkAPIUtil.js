export const fetchArtworks = () => (
  fetch('/api/v1/artworks')
);

export const fetchSavedArtworks = () => (
  fetch('/api/v1/artwork_saves')
);

export const fetchArtwork = id => (
  fetch(`/api/v1/artworks/${id}`)
);

export const searchArtworks = queryString => (
  fetch(`/api/v1/artworks/search?q=${encodeURIComponent(queryString)}`)
);