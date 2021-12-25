import { CSRFRequestHeaders } from "./CSRFTokenUtil";

export const createArtworkSave = artworkSave => (
  fetch('/api/v1/artwork_saves', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify(artworkSave)
  })
);

export const deleteArtworkSave = aic_id => (
  fetch(`/api/v1/artwork_saves/aic_id/${aic_id}`, {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);