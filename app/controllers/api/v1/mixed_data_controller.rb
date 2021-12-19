class Api::V1::MixedDataController < ApplicationController
  def index
    @collections = Collection.randomized(6)
    @artworks = []

    begin
      url = "https://api.artic.edu/api/v1/artworks"

      response = Faraday.get(url) do |req|
        req.params["limit"] = 3
        req.params["fields"] = "id,title,artist_title,date_display,image_id,thumbnail"
        req.options.timeout = 8000
      end

      json = JSON.parse(response.body)
      @artworks = json["data"]

    rescue Faraday::TimeoutError
      render_timeout
    end

    # render template: "api/v1/mixed_data/index"
  end
end
