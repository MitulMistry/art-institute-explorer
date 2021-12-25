json.extract! artwork_save, :id, :user_id, :artwork_id, :created_at, :updated_at
json.aic_id artwork_save.artwork.aic_id
json.url api_v1_artwork_save_url(artwork_save, format: :json)
