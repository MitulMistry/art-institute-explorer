require 'rails_helper'

RSpec.describe "/artworks", type: :request do
  shared_examples_for "public access to artworks" do
    describe "GET /index" do
      it "responds with a JSON formatted list of artworks (10 by default)" do
        VCR.use_cassette("artworks_index") do
          get api_v1_artworks_url
          expect(response).to be_successful

          json = JSON.parse(response.body)
          expect(json["data"].length).to eq(10)
        end
      end
    end

    describe "GET /search" do
      it "responds with a JSON formatted list of artworks" do
        VCR.use_cassette("artworks_search_van_gogh") do
          get "/api/v1/artworks/search?q=van+gogh"
          expect(response).to be_successful

          json = JSON.parse(response.body)
          expect(json["data"].length).to be > 1
          expect(json["data"][0]["artist_title"]).to eq("Vincent van Gogh")
        end
      end
    end

    describe "GET /show" do
      context "with valid parameters" do
        it "responds with a JSON formatted artwork" do
          VCR.use_cassette("artworks_show_grande_jatte") do
            get api_v1_artwork_url(27992)
            expect(response).to be_successful

            json = JSON.parse(response.body)
            expect(json["data"]["title"]).to eq("A Sunday on La Grande Jatte — 1884")
          end
        end
      end

      context "with invalid parameters" do
        it "responds with an error in JSON format for invalid id type" do
          VCR.use_cassette("artworks_show_invalid_01") do
            get api_v1_artwork_url("invalid1234")
            expect(response).to have_http_status(400)

            json = JSON.parse(response.body)
            expect(json["error"]).to eq("Invalid syntax")
          end
        end

        it "responds with an error in JSON format for out of range id" do
          VCR.use_cassette("artworks_show_invalid_02") do
            get api_v1_artwork_url(99999999)
            expect(response).to have_http_status(404)

            json = JSON.parse(response.body)
            expect(json["error"]).to eq("Not found")
          end
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
