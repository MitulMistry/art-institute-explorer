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

  def artworks_aic_ids
    self.artworks.pluck(:aic_id)
  end

  # Return the Collection's Artworks, but sorted by the oldest created join table
  # (collection_artworks), since Artworks are already created in the database and we cannot
  # sort by the Artworks creation time. If no argument provided (nil), will return all.
  def ordered_first_artworks(count=nil)
    query = ActiveRecord::Base::sanitize_sql_array(
      [
        'INNER JOIN collection_artworks 
        ON collection_artworks.artwork_id = artworks.id 
        AND collection_artworks.collection_id = ? 
        ORDER BY collection_artworks.created_at ASC
        LIMIT ?',
        self.id,
        count
      ]
    )
    Artwork.joins(query)
  end

  def ordered_collection_comments
    self.collection_comments.order(created_at: :desc)
  end
end
