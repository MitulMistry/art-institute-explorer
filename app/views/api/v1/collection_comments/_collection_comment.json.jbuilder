json.extract! collection_comment, :id, :body, :collection_id, :created_at, :updated_at

json.user_id collection_comment.user.id
json.username collection_comment.user.username


json.url api_v1_collection_comment_url(collection_comment, format: :json)
