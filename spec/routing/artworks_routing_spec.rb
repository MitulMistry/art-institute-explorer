require "rails_helper"

RSpec.describe Api::V1::ArtworksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/artworks").to route_to("api/v1/artworks#index", format: :json)
    end

    it "routes to #search" do
      expect(get: "/api/v1/artworks/search").to route_to("api/v1/artworks#search", format: :json)
    end

    it "routes to #show" do
      expect(get: "/api/v1/artworks/1").to route_to("api/v1/artworks#show", id: "1", format: :json)
    end
  end
end
