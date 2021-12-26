json.extract! local_collection, :id, :title, :description, :artworks, :created_at, :updated_at

json.user do
  json.id local_collection.user.id
  json.username local_collection.user.username
end

json.artworks local_collection.artworks.first(3)

json.like_count local_collection.like_count

json.url api_v1_collection_url(local_collection, format: :json)
