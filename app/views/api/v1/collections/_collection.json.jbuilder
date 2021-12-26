json.extract! local_collection, :id, :title, :description, :artworks, :collection_comments, :created_at, :updated_at

json.user do
  json.id local_collection.user.id
  json.username local_collection.user.username
end

json.collection_comments local_collection.collection_comments do |collection_comment|
  json.id collection_comment.id
  json.user_id collection_comment.user_id
  json.username collection_comment.user.username
  json.body collection_comment.body
  json.created_at collection_comment.created_at
  json.updated_at collection_comment.updated_at
end

json.like_count local_collection.like_count

json.url api_v1_collection_url(local_collection, format: :json)
