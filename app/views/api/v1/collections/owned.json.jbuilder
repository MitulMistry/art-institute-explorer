json.array! @collections do |collection|
  json.id collection.id
  json.title collection.title
  json.aic_ids collection.artworks_aic_ids
end
