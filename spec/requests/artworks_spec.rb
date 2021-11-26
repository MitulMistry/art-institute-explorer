require 'rails_helper'

RSpec.describe "Artworks", type: :request do
  shared_examples_for "public access to artworks" do
    describe "GET /index" do
      it "responds with a JSON formatted list of artworks (10 by default)" do
        get api_v1_artworks_url
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json["data"].length).to eq(10)
      end
    end

    describe "GET /search" do
      it "responds with a JSON formatted list of artworks" do
        get "/api/v1/artworks/search?q=van+gogh"
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json).to include("Vincent van Gogh")
      end
    end

    describe "GET /show" do
      context "with valid parameters" do
        it "responds with a JSON formatted artwork" do
          get api_v1_artwork_url(27992)
          expect(response).to be_successful
          
          json = JSON.parse(response.body)
          expect(json).to include("A Sunday on La Grande Jatte — 1884")
        end
      end

      context "with invalid parameters" do
        after :each do
          expect(response).to have_http_status(400)

          json = JSON.parse(response.body)
          expect(json).to include("invalid artwork id")
        end

        it "responds with an error in JSON format for invalid id type" do
          get api_v1_artwork_url("invalid1234")
        end

        it "responds with an error in JSON format for out of range id" do
          get api_v1_artwork_url(99999999)
        end
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "public access to artworks"
  end

  describe "unauthenticated access" do
    it_behaves_like "public access to artworks"
  end
end
