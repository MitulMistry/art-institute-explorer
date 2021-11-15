class Artwork < ApplicationRecord
  has_many :collection_artworks
  has_many :collections, through: :collection_artworks
end
