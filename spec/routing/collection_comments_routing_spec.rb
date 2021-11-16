require "rails_helper"

RSpec.describe Api::V1::CollectionCommentsController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/v1/collection_comments").to route_to("api/v1/collection_comments#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/collection_comments/1").to route_to("api/v1/collection_comments#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/collection_comments/1").to route_to("api/v1/collection_comments#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/collection_comments/1").to route_to("api/v1/collection_comments#destroy", id: "1")
    end
  end
end
