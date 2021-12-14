json.extract! local_collection, :id, :title, :description, :artworks, :collection_comments, :created_at, :updated_at

json.user do
  json.id local_collection.user.id
  json.username local_collection.user.username
end

json.url api_v1_collection_url(local_collection, format: :json)