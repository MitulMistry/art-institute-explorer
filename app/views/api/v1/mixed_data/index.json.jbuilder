json.collections @collections do |collection|
  json.id collection.id
  json.title collection.title
  json.like_count collection.like_count
  json.artworks collection.artworks.first(3)

  json.user do
    json.id collection.user.id
    json.username collection.user.username
  end
end

json.artworks @artworks
json.artworks_response @artworks_response
