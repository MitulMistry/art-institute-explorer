require "rails_helper"

RSpec.describe SavedArtworksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/saved_artworks").to route_to("saved_artworks#index")
    end

    it "routes to #create" do
      expect(post: "/api/saved_artworks").to route_to("saved_artworks#create")
    end

    it "routes to #destroy" do
      expect(delete: "/api/saved_artworks/1").to route_to("saved_artworks#destroy", id: "1")
    end
  end
end
