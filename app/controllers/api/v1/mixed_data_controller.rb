class Api::V1::MixedDataController < ApplicationController
  def index
    @collections = Collection.randomized(8)
    @artworks = []
    @artworks_response = {}

    begin
      url = "https://api.artic.edu/api/v1/artworks/search"

      response = Faraday.get(url) do |req|
        req.params["limit"] = 8
        req.params["fields"] = "id,title,artist_title,date_display,image_id,thumbnail"
        req.params["query[term][is_boosted]"] = true
        req.params["page"] = params[:artpage] || rand(1..10)
        req.options.timeout = 8000
      end

      json = JSON.parse(response.body)
      @artworks = json["data"]
      @artworks_response = json.except!("data")

    rescue Faraday::TimeoutError
      render_timeout
    end
  end
end
