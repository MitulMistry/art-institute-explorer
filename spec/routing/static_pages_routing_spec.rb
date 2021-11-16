require "rails_helper"

RSpec.describe StaticPagesController, type: :routing do
  describe "routing" do
    it "routes to #root" do
      expect(get: "/").to route_to("static_pages#root")
    end
  end
end
