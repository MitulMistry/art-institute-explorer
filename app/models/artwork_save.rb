class ArtworkSave < ApplicationRecord
  belongs_to :user
  belongs_to :artwork

  def self.new_by_aic_id(user_id, aic_id)
    artwork = Artwork.find_or_create_by_aic_id(aic_id)
    if artwork
      return ArtworkSave.new(user_id: user_id, artwork_id: artwork.id)
    else
      nil
    end
  end
end
