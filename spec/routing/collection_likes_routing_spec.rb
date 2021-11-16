require "rails_helper"

RSpec.describe Api::V1::CollectionLikesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/v1/collection_likes").to route_to("api/v1/collection_likes#create")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/collection_likes/1").to route_to("api/v1/collection_likes#destroy", id: "1")
    end
  end
end
