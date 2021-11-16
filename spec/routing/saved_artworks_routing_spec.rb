require "rails_helper"

RSpec.describe Api::V1::SavedArtworksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/saved_artworks").to route_to("api/v1/saved_artworks#index")
    end

    it "routes to #create" do
      expect(post: "/api/v1/saved_artworks").to route_to("api/v1/saved_artworks#create")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/saved_artworks/1").to route_to("api/v1/saved_artworks#destroy", id: "1")
    end
  end
end
