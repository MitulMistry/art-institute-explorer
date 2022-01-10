require "faraday"

class Api::V1::ArtworksController < ApplicationController

  def index
    begin
      url = "https://api.artic.edu/api/v1/artworks/search"

      response = Faraday.get(url) do |req|
        req.params["limit"] = 12
        req.params["fields"] = "id,title,artist_title,date_display,image_id,thumbnail"
        req.params["query[term][is_boosted]"] = true
        req.params["page"] = params[:page] || 1
        req.options.timeout = 8000
      end

      json = JSON.parse(response.body)
      render json: json, status: response.status

    rescue Faraday::TimeoutError
      render_timeout
    end
  end

  def search
    begin
      query = params[:q]
      url = "https://api.artic.edu/api/v1/artworks/search"

      response = Faraday.get(url) do |req|
        req.params["limit"] = 12
        req.params["q"] = query
        req.params["fields"] = "id,title,artist_title,date_display,image_id,thumbnail"
        req.params["page"] = params[:page] || 1
        req.options.timeout = 8000
      end

      json = JSON.parse(response.body)
      render json: json, status: response.status

    rescue Faraday::TimeoutError
      render_timeout
    end
  end

  def show
    begin
      id = params[:id]
      url = "https://api.artic.edu/api/v1/artworks/#{id}"
      
      response = Faraday.get(url) do |req|
        req.options.timeout = 8000
      end

      json = JSON.parse(response.body)
      render json: json, status: response.status

    rescue Faraday::TimeoutError
      render_timeout
    end
  end

  private
  def render_timeout
    render json: ["There was a timeout. Please try again."]
  end
end
