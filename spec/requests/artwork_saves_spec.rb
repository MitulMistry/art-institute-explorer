require 'rails_helper'

RSpec.describe "ArtworkSaves", type: :request do

  let(:valid_attributes) {
    { user_id: (@user || create(:user)).id, artwork_id: create(:artwork, aic_id: 27992).id }
  }

  let(:invalid_attributes) {
    { user_id: @user.id, artwork_id: 99999999 }
  }

  let(:valid_attributes_non_owned) {
    { user_id: create(:user).id, artwork_id: create(:artwork, aic_id: 27992).id }
  }

  # Define @user before using these tests
  shared_examples_for "access to ArtworkSaves" do
    describe "GET /index" do
      it "responds with a JSON formatted list of ArtworkSaves" do
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        artwork3 = create(:artwork)
        @user.saved_artworks << artwork1
        @user.saved_artworks << artwork2

        get api_v1_artwork_saves_url
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json.length).to eq(2)
        expect(json).to include(artwork1.title)
        expect(json).to include(artwork2.title)
      end
    end    

    describe "POST /create" do
      context "with valid parameters" do
        it "creates a new ArtworkSave" do
          expect {
            post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
          }.to change(ArtworkSave, :count).by(1)
        end

        it "responds with the created ArtworkSave in JSON format" do
          post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
          expect(response).to be_successful

          json = JSON.parse(response.body)
          expect(json).to include(valid_attributes[:user_id])
          expect(json).to include(valid_attributes[:artwork_id])
        end
      end

      context "with invalid parameters" do
        it "does not create a new ArtworkSave" do
          expect {
            post api_v1_artwork_saves_url, params: { artwork_save: invalid_attributes }
          }.to change(ArtworkSave, :count).by(0)
        end

        it "responds with an error in JSON format" do
          post api_v1_artwork_saves_url, params: { artwork_save: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["username"]).to include("invalid artwork id")
        end
      end
    end

    describe "DELETE /destroy" do
      before :each do
        # @artwork_save = @user.artwork_saves.build(artwork_id: valid_attributes[:artwork_id])
        # @artwork_save.save
        @artwork_save = ArtworkSave.create! valid_attributes #{ user_id: @user.id, artwork_id: valid_attributes[:artwork_id] }
        # @artwork_save = ArtworkSave.create(user_id: @user.id, artwork_id: valid_attributes[:artwork_id])
      end

      it "destroys the requested ArtworkSave successfully" do       
        expect {
          # byebug
          delete api_v1_artwork_save_url(@artwork_save)
        }.to change(ArtworkSave, :count).by(1)
      end

      it "responds successfully" do
        delete api_v1_artwork_save_url(@artwork_save)
        expect(response).to be_successful
      end
    end
  end

  # Define @user before using these tests
  shared_examples_for "no creation or modification access to non-owned ArtworkSaves" do
    describe "POST /create" do      
      it "does not create a new ArtworkSave" do
        expect {
          post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes_non_owned }
        }.to change(ArtworkSave, :count).by(0)
      end

      it "responds with 403 forbidden" do
        post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes_non_owned }
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE /destroy" do
      before :each do
        @artwork_save = ArtworkSave.create(valid_attributes_non_owned)
      end

      it "does not destroy the requested ArtworkSave" do       
        expect {
          delete api_v1_artwork_save_url(@artwork_save)
        }.to change(ArtworkSave, :count).by(0)
      end

      it "responds with 403 forbidden" do
        delete api_v1_artwork_save_url(@artwork_save)
        expect(response).to have_http_status(403)
      end
    end
  end

  shared_examples_for "no access to ArtworkSaves" do
    describe "GET /index" do
      it "responds with 403 forbidden" do
        get api_v1_artwork_saves_url
        expect(response).to have_http_status(403)
      end
    end

    describe "POST /create" do
      it "does not create the requested ArtworkSave" do       
        expect {
          post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
        }.to change(ArtworkSave, :count).by(0)
      end

      it "responds with 403 forbidden" do
        post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE /destroy" do
      before :each do
        @artwork_save = ArtworkSave.create(valid_attributes)  
      end

      it "does not destroy the requested ArtworkSave" do       
        expect {
          delete api_v1_artwork_save_url(@artwork_save)
        }.to change(ArtworkSave, :count).by(0)
      end

      it "responds with 403 forbidden" do        
        delete api_v1_artwork_save_url(@artwork_save)
        expect(response).to have_http_status(403)
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "access to ArtworkSaves"
    it_behaves_like "no creation or modification access to non-owned ArtworkSaves"
  end

  describe "unauthenticated access" do
    it_behaves_like "no access to ArtworkSaves"
  end
end