class User < ApplicationRecord
  has_secure_password

  has_many :artwork_saves
  has_many :saved_artworks, through: :artwork_saves, source: :artwork
  has_many :collections
  has_many :collection_likes
  has_many :liked_collections, through: :collection_likes, source: :collection
  has_many :collection_comments

  has_one_attached :avatar

  validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 40 }, format: { with: /\A[a-zA-Z0-9_-]+\Z/ }
  validates :email, presence: true, length: { maximum: 100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true
  validates :bio, length: { maximum: 500 }

  validates :avatar, content_type: ['image/png', 'image/jpg', 'image/jpeg'], size: { less_than: 1.megabytes }
end
