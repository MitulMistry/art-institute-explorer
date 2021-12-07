require "faraday"

class Artwork < ApplicationRecord
  has_many :collection_artworks
  has_many :collections, through: :collection_artworks

  validates :aic_id, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 999999 }
  validates :image_id, presence: true, length: { maximum: 1000 }
  validates :image_url_prefix, presence: true, length: { maximum: 1000 }
  validates :title, length: { maximum: 300 }
  validates :artist_title, length: { maximum: 300 }
  validates :alt_text, length: { maximum: 1000 }

  def self.find_or_create_by_aic_id(aic_id)
    begin
      if aic_id.is_a?(Integer) && aic_id > 0 && aic_id <= 999999
        artwork = Artwork.find_by(aic_id: aic_id)

        if !artwork
          url = "https://api.artic.edu/api/v1/artworks/#{aic_id}"

          response = Faraday.get(url) do |req|
            req.params["fields"] = "id,title,artist_title,thumbnail,image_id"
            req.options.timeout = 8000
          end

          json = JSON.parse(response.body)

          artwork = Artwork.create(
            title: json["data"]["title"],
            alt_text: json["data"]["thumbnail"]["alt_text"],
            artist_title: json["data"]["artist_title"],
            image_id: json["data"]["image_id"],
            image_url_prefix: json["config"]["iiif_url"],
            aic_id: json["data"]["id"]
          )
        end

        artwork
      else
        nil
      end

    rescue Faraday::TimeoutError
      nil
    end
  end
end
