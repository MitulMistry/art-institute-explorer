import { CSRFRequestHeaders } from "./CSRFTokenUtil";

export const createArtworkSave = aic_id => (
  fetch('/api/v1/artwork_saves', {
    method: 'POST',
    headers: CSRFRequestHeaders(),
    body: JSON.stringify({artwork_save: {aic_id: aic_id}})
  })
);

export const deleteArtworkSave = aic_id => (
  fetch(`/api/v1/artwork_saves/aic_id/${aic_id}`, {
    method: 'DELETE',
    headers: CSRFRequestHeaders()
  })
);