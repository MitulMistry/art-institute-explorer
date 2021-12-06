json.extract! artwork, :title, :artist_title, :aic_id, :image_id, :image_url_prefix, :alt_text, :created_at, :updated_at
json.url api_v1_artwork_url(artwork, format: :json)
