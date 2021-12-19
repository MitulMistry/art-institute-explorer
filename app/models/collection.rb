class Collection < ApplicationRecord
  belongs_to :user
  has_many :collection_artworks
  has_many :artworks, -> { distinct }, through: :collection_artworks
  has_many :collection_comments
  has_many :collection_likes

  validates :title, presence: true, length: { maximum: 300 }
  validates :description, length: { maximum: 1000 }

  extend ClassOrderable

  def like_count
    self.collection_likes.count
  end
end
