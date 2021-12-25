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

    it "routes to #destroy_by_artwork_id" do
      expect(delete: "/api/v1/artwork_saves/artwork_id/1").to route_to("api/v1/artwork_saves#destroy_by_artwork_id", id: "1", format: :json)
    end

    it "routes to #destroy_by_aic_id" do
      expect(delete: "/api/v1/artwork_saves/aic_id/1").to route_to("api/v1/artwork_saves#destroy_by_aic_id", id: "1", format: :json)
    end
  end
end
