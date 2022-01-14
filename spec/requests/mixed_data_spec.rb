require 'rails_helper'

RSpec.describe "/mixed_data", type: :request do
  shared_examples_for "public access to mixed data" do
    describe "GET /index" do
      it "responds with a JSON formatted list of Artworks and Collections" do
        VCR.use_cassette("mixed_data_index") do
          collection1 = create(:collection)
          collection2 = create(:collection)

          get api_v1_mixed_data_url(artpage: 1)
          expect(response).to be_successful

          json = JSON.parse(response.body)

          expect(json["artworks"].length).to be >= 3

          expect(json["collections"].any? { |hash| hash["title"] == collection1.title }).to be true
          expect(json["collections"].any? { |hash| hash["title"] == collection2.title }).to be true
        end
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "public access to mixed data"
  end

  describe "unauthenticated access" do
    it_behaves_like "public access to mixed data"
  end
end
