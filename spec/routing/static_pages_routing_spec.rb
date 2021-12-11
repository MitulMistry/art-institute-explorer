require "rails_helper"

RSpec.describe StaticPagesController, type: :routing do
  describe "routing" do
    it "routes to #root" do
      expect(get: "/").to route_to("static_pages#root")
    end

    it "routes default to #root" do
      expect(get: "/test123").to route_to(controller: "static_pages", action: "root", path: "test123")
      expect(get: "/artworks/1").to route_to(controller: "static_pages", action: "root", path: "artworks/1")
      expect(get: "/users/1").to route_to(controller: "static_pages", action: "root", path: "users/1")
    end
  end
end
