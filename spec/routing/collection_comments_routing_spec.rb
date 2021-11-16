require "rails_helper"

RSpec.describe CollectionCommentsController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "/api/collection_comments").to route_to("collection_comments#create")
    end

    it "routes to #destroy" do
      expect(delete: "/api/collection_comments").to route_to("collection_comments#destroy")
    end
  end
end
