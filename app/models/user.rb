class User < ApplicationRecord
  has_secure_password

  has_many :artwork_saves
  has_many :saved_artworks, through: :artwork_saves, source: :artwork
  has_many :collections
  has_many :collection_likes
  has_many :liked_collections, through: :collection_likes, source: :collection
end
