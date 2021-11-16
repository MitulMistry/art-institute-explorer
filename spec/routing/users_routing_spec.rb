require "rails_helper"

RSpec.describe UsersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/users").to route_to("users#index")
    end

    it "routes to #show" do
      expect(get: "/api/users/1").to route_to("users#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/users").to route_to("users#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/users/1").to route_to("users#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/users/1").to route_to("users#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/users/1").to route_to("users#destroy", id: "1")
    end
  end
end
