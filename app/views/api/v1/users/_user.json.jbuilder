json.extract! user, :id, :username, :email, :bio, :created_at, :updated_at

json.collections user.collections.last(10) do |collection|
  json.id collection.id
  json.title collection.title
  json.artworks collection.artworks.first(3)
end

json.saved_artworks user.saved_artworks.last(10)

json.url api_v1_user_url(user, format: :json)
