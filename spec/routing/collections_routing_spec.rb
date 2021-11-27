require "rails_helper"

RSpec.describe Api::V1::CollectionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/collections").to route_to("api/v1/collections#index", format: :json)
    end

    it "routes to #liked" do
      expect(get: "/api/v1/collections/liked").to route_to("api/v1/collections#liked", format: :json)
    end

    it "routes to #show" do
      expect(get: "/api/v1/collections/1").to route_to("api/v1/collections#show", id: "1", format: :json)
    end

    it "routes to #create" do
      expect(post: "/api/v1/collections").to route_to("api/v1/collections#create", format: :json)
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/collections/1").to route_to("api/v1/collections#update", id: "1", format: :json)
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/collections/1").to route_to("api/v1/collections#update", id: "1", format: :json)
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/collections/1").to route_to("api/v1/collections#destroy", id: "1", format: :json)
    end
  end
end
