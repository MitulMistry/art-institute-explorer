require "rails_helper"

RSpec.describe CollectionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/collections").to route_to("collections#index")
    end

    it "routes to #show" do
      expect(get: "/api/collections/1").to route_to("collections#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/collections").to route_to("collections#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/collections/1").to route_to("collections#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/collections/1").to route_to("collections#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/collections/1").to route_to("collections#destroy", id: "1")
    end
  end
end
