require "rails_helper"

RSpec.describe CollectionLikesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/collection_likes").to route_to("collection_likes#create")
    end

    it "routes to #destroy" do
      expect(delete: "/api/collection_likes").to route_to("collection_likes#destroy")
    end
  end
end
