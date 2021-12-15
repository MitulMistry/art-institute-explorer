export const fetchArtworks = () => (
  fetch('/api/v1/artworks')
);

export const fetchArtwork = id => (
  fetch(`/api/v1/artworks/${id}`)
);