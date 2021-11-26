class Artwork < ApplicationRecord
  has_many :collection_artworks
  has_many :collections, through: :collection_artworks

  validates :aic_id, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 99999 }
  validates :image_url, presence: true, length: { maximum: 1000 }
  validates :title, length: { maximum: 300 }
  validates :artist_title, length: { maximum: 300 }
  validates :alt_text, length: { maximum: 1000 }
end
