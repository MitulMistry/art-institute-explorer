class User < ApplicationRecord
  has_secure_password

  has_many :artwork_saves
  has_many :saved_artworks, -> { distinct }, through: :artwork_saves, source: :artwork
  has_many :collections
  has_many :collection_likes
  has_many :liked_collections, -> { distinct }, through: :collection_likes, source: :collection
  has_many :collection_comments

  has_one_attached :avatar

  validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 40 }, format: { with: /\A[a-zA-Z0-9_-]+\Z/ }
  validates :email, presence: true, length: { maximum: 100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 5, maximum: 40 }, if: :password_required?
  validates :bio, length: { maximum: 500 }

  validates :avatar, content_type: ['image/png', 'image/jpg', 'image/jpeg'], size: { less_than: 1.megabytes }

  # Return an array of aic_ids from the user's saved Artworks
  def saved_artworks_aic_ids
    self.saved_artworks.pluck(:aic_id)
  end

  # Return an array of ids from the user's liked Collections
  def liked_collections_ids
    self.liked_collections.pluck(:id)
  end

  # Set this in controller to manually enforce password validation:
  # @user.enforce_password_validation
  def enforce_password_validation
    @enforce_password_validation = true
  end

  private

  # Validate password if password is being submitted. Allows updating
  # user info without having to submit password at same time.
  def password_required?
    @enforce_password_validation || password.present?
  end
end
