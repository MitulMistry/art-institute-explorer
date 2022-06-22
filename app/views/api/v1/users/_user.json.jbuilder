json.extract! user, :id, :username, :email, :bio, :created_at, :updated_at

json.collections user.ordered_collections.first(10) do |collection|
  json.id collection.id
  json.title collection.title
  json.artworks collection.artworks.first(3)
  json.like_count collection.like_count
end

json.saved_artworks user.ordered_saved_artworks.limit(10)

json.url api_v1_user_url(user, format: :json)
