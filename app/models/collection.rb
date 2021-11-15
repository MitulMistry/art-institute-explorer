class Collection < ApplicationRecord
  belongs_to :user
  has_many :collection_artworks
  has_many :artworks, through: :collection_artworks

  validates :title, presence: true, length: { maximum: 300 }
  validates :description, length: { maximum: 1000 }
end
