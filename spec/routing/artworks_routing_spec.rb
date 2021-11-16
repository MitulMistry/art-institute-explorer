require "rails_helper"

RSpec.describe ArtworksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/artworks").to route_to("artworks#index")
    end

    it "routes to #show" do
      expect(get: "/api/artworks/1").to route_to("artworks#show", id: "1")
    end
  end
end
