require "rails_helper"

RSpec.describe Api::V1::CollectionLikesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/v1/collection_likes").to route_to("api/v1/collection_likes#create", format: :json)
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/collection_likes/1").to route_to("api/v1/collection_likes#destroy", id: "1", format: :json)
    end

    it "routes to #destroy_by_collection_id" do
      expect(delete: "/api/v1/collection_likes/collection_id/1").to route_to("api/v1/collection_likes#destroy_by_collection_id", id: "1", format: :json)
    end
  end
end
