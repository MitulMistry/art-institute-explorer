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

  # Finds an Artwork by its aic_id (external AIC API id) and retrieves it. If it's not
  # found, it creates a new Artwork with the aic_id using an external API call. It returns
  # a found or created Artwork.
  def self.find_or_create_by_aic_id(aic_id)
    if aic_id.is_a?(Integer) && aic_id > 0 && aic_id <= 999999
      artwork = Artwork.find_by(aic_id: aic_id)

      if !artwork
        artwork = self.create_artwork_from_aic_api(aic_id)
      end

      artwork
    else
      nil
    end
  end

  # Does the same as self.find_or_create_by_aic_id(), but does it with an array of aic_ids
  # instead of only one. For each aic_id, the method will find an Artwork if it exists.
  # If it does not, it creates a new Artwork with the aic_id using an external API call.
  # It returns an array of found or created Artworks.
  def self.find_or_create_by_aic_ids(aic_ids_array)
    return nil if aic_ids_array.count > 6

    filtered_ids = aic_ids_array.select { |id| id.is_a?(Integer) && id > 0 && id <= 999999 }

    return nil if filtered_ids.count == 0 || filtered_ids.nil?

    artworks = []

    filtered_ids.each do |aic_id|
      artwork = Artwork.find_by(aic_id: aic_id)

      if artwork
        artworks << artwork
      else
        artwork = self.create_artwork_from_aic_api(aic_id)
        artworks << artwork if artwork
      end
    end

    artworks
  end

  # This method is a helper method for actually making the external AIC API call using a
  # given aic_id argument. It uses Faraday to make the GET request and retrieve the data used
  # to create the new Artwork. It returns the newly created Artwork, or nil if it times out.
  # This method should not be used directly since you risk creating duplicate Artworks with the
  # same aic_ids. Instead, use find_or_create_by_aic_id() or find_or_create_by_aic_ids().
  private_class_method def self.create_artwork_from_aic_api(aic_id)
    begin
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

      artwork
    rescue Faraday::TimeoutError
      nil
    end
  end
end