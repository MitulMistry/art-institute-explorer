require "rails_helper"

RSpec.describe Api::V1::ArtworkSavesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/artwork_saves").to route_to("api/v1/artwork_saves#index", format: :json)
    end

    it "routes to #create" do
      expect(post: "/api/v1/artwork_saves").to route_to("api/v1/artwork_saves#create", format: :json)
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/artwork_saves/1").to route_to("api/v1/artwork_saves#destroy", id: "1", format: :json)
    end
  end
end
