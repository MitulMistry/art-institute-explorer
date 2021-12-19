require "rails_helper"

RSpec.describe Api::V1::MixedDataController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/mixed_data").to route_to("api/v1/mixed_data#index", format: :json)
    end
  end
end
