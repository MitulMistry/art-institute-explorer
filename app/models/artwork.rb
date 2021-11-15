class Artwork < ApplicationRecord
  has_many :collection_artworks
  has_many :collections, through: :collection_artworks

  validates :image_url, presence: true, length: { maximum: 1000 }
  validates :title, length: { maximum: 300 }
  validates :artist_title, length: { maximum: 300 }
  validates :alt_text, length: { maximum: 1000 }
end
