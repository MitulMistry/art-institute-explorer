json.extract! collection_like, :id, :collection_id, :created_at, :updated_at

json.user do
  json.id collection_like.user.id
  json.username collection_like.user.username
end

json.collection_like_count collection_like.collection.like_count

json.url api_v1_collection_like_url(collection_like, format: :json)
