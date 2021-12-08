require 'rails_helper'

RSpec.describe "Static pages", type: :request do
  describe "GET /index" do
    it "serves the static index page" do
      get root_path
      expect(response).to be_successful

      # Check for HTML title
      expect(response.body).to include("Art Institute Explorer")
    end
  end
end
