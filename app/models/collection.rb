class Collection < ApplicationRecord
  belongs_to :user
  has_many :collection_artworks
  has_many :artworks, through: :collection_artworks
end
