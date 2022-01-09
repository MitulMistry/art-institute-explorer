require 'rails_helper'

RSpec.describe "/artwork_saves", type: :request do

  let(:valid_attributes) {
    { user_id: (@user || create(:user)).id, artwork_id: create(:artwork, aic_id: 27992).id }
  }

  let(:valid_attributes_using_aic_id) {
    { user_id: (@user || create(:user)).id, aic_id: 27992 }
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
      it "responds with a JSON formatted list of saved Artworks" do
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        artwork3 = create(:artwork)
        @user.saved_artworks << artwork1
        @user.saved_artworks << artwork2

        get api_v1_artwork_saves_url
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json.length).to eq(2)
        expect(json["artworks"].any? { |hash| hash["title"] == artwork1.title }).to be true
        expect(json["artworks"].any? { |hash| hash["title"] == artwork2.title }).to be true
      end
    end

    describe "POST /create" do
      context "with valid parameters" do
        it "creates a new ArtworkSave with Artwork model id" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            expect {
              post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
            }.to change(ArtworkSave, :count).by(1)
          end
        end

        it "creates a new ArtworkSave with Artwork aic_id" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            expect {
              post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes_using_aic_id }
            }.to change(ArtworkSave, :count).by(1)
          end
        end

        it "creates a new Artwork if it doesn't already exist" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            expect {
              post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes_using_aic_id }
            }.to change(Artwork, :count).by(1)
          end
        end

        it "doesn't create a new Artwork if it alreadys exists" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            artwork = create(:artwork, aic_id: valid_attributes_using_aic_id[:aic_id])
            expect {
              post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes_using_aic_id }
            }.to change(Artwork, :count).by(0)
          end
        end

        it "responds with the created ArtworkSave in JSON format" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
            expect(response).to be_successful

            json = JSON.parse(response.body)
            expect(json["user_id"]).to eq(valid_attributes[:user_id])
            expect(json["artwork_id"]).to eq(valid_attributes[:artwork_id])
          end
        end
      end

      context "with invalid parameters" do
        it "does not create a new ArtworkSave" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            expect {
              post api_v1_artwork_saves_url, params: { artwork_save: invalid_attributes }
            }.to change(ArtworkSave, :count).by(0)
          end
        end

        it "responds with an error in JSON format" do
          VCR.use_cassette("artwork_save_grande_jatte") do
            post api_v1_artwork_saves_url, params: { artwork_save: invalid_attributes }
            expect(response).to have_http_status(422)

            json = JSON.parse(response.body)
            expect(json["artwork"]).to include("must exist")
          end
        end

        context "with duplicate parameters" do
          before :each do
            @artwork = create(:artwork, aic_id: valid_attributes_using_aic_id[:aic_id])
            @user.saved_artworks << @artwork
          end
  
          it "does not create a new ArtworkSave with duplicate Artwork id" do
            VCR.use_cassette("artwork_save_grande_jatte") do
              expect {
                post api_v1_artwork_saves_url, params: { artwork_save:
                  { user_id: @user.id, artwork_id: @artwork.id }}
              }.to change(CollectionLike, :count).by(0)
            end
          end
  
          it "responds with an error in JSON format for duplicate Artwork id" do
            VCR.use_cassette("artwork_save_grande_jatte") do
              post api_v1_artwork_saves_url, params: { artwork_save:
                { user_id: @user.id, artwork_id: @artwork.id }}
              expect(response).to have_http_status(422)
    
              json = JSON.parse(response.body)
              expect(json).to include("Duplicate record")
            end
          end

          it "does not create a new ArtworkSave with duplicate Artwork aic_id" do
            VCR.use_cassette("artwork_save_grande_jatte") do
              expect {
                post api_v1_artwork_saves_url, params: { artwork_save:
                  { user_id: @user.id, aic_id: @artwork.aic_id }}
              }.to change(CollectionLike, :count).by(0)
            end
          end
  
          it "responds with an error in JSON format for duplicate aic_id" do
            VCR.use_cassette("artwork_save_grande_jatte") do
              post api_v1_artwork_saves_url, params: { artwork_save:
                { user_id: @user.id, aic_id: @artwork.aic_id }}
              expect(response).to have_http_status(422)
    
              json = JSON.parse(response.body)
              expect(json).to include("Duplicate record")
            end
          end
        end
      end
    end

    describe "DELETE /destroy" do
      context "with standard request" do
        before :each do
          # @artwork_save = @user.artwork_saves.build(artwork_id: valid_attributes[:artwork_id])
          # @artwork_save.save
          @artwork_save = ArtworkSave.create! valid_attributes #{ user_id: @user.id, artwork_id: valid_attributes[:artwork_id] }
          # @artwork_save = ArtworkSave.create(user_id: @user.id, artwork_id: valid_attributes[:artwork_id])
        end

        it "destroys the requested ArtworkSave successfully" do
          expect {
            delete api_v1_artwork_save_url(@artwork_save)
          }.to change(ArtworkSave, :count).by(-1)
        end

        it "responds successfully" do
          delete api_v1_artwork_save_url(@artwork_save)
          expect(response).to be_successful
        end
      end

      context "with Artwork id requests" do
        before :each do
          @artwork = create(:artwork)
          @user.saved_artworks << @artwork
        end

        it "destroys the requested ArtworkSave by aic_id" do
          expect {
            delete api_v1_artwork_save_by_aic_id_url(@artwork.aic_id)
          }.to change(ArtworkSave, :count).by(-1)
        end

        it "responds successfully" do
          delete api_v1_artwork_save_by_aic_id_url(@artwork.aic_id)
          expect(response).to be_successful
        end

        it "destroys the requested ArtworkSave by artwork_id" do
          expect {
            delete api_v1_artwork_save_by_artwork_id_url(@artwork.id)
          }.to change(ArtworkSave, :count).by(-1)
        end

        it "responds successfully" do
          delete api_v1_artwork_save_by_artwork_id_url(@artwork.id)
          expect(response).to be_successful
        end
      end
    end
  end

  # Define @user before using these tests
  shared_examples_for "no destruction access to non-owned ArtworkSaves" do
    describe "DELETE /destroy" do
      context "with standard request" do
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

      context "with Artwork id requests" do
        before :each do
          @other_user = create(:user)
          @artwork = create(:artwork)
          @other_user.saved_artworks << @artwork
        end

        it "does not destroy the requested ArtworkSave" do
          expect {
            delete api_v1_artwork_save_by_aic_id_url(@artwork.aic_id)
          }.to change(ArtworkSave, :count).by(0)
        end

        it "responds with 404 not found" do
          delete api_v1_artwork_save_by_aic_id_url(@artwork.aic_id)
          expect(response).to have_http_status(404)
        end

        it "does not destroy the requested ArtworkSave" do
          expect {
            delete api_v1_artwork_save_by_artwork_id_url(@artwork.id)
          }.to change(ArtworkSave, :count).by(0)
        end

        it "responds with 404 not found" do
          delete api_v1_artwork_save_by_artwork_id_url(@artwork.id)
          expect(response).to have_http_status(404)
        end
      end
    end
  end

  shared_examples_for "no access to ArtworkSaves" do
    describe "GET /index" do
      it "responds with 401 unauthorized" do
        get api_v1_artwork_saves_url
        expect(response).to have_http_status(401)
      end
    end

    describe "POST /create" do
      it "does not create the requested ArtworkSave" do
        expect {
          post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
        }.to change(ArtworkSave, :count).by(0)
      end

      it "responds with 401 unauthorized" do
        post api_v1_artwork_saves_url, params: { artwork_save: valid_attributes }
        expect(response).to have_http_status(401)
      end
    end

    describe "DELETE /destroy" do
      context "with standard request" do
        before :each do
          @artwork_save = ArtworkSave.create(valid_attributes)
        end

        it "does not destroy the requested ArtworkSave" do
          expect {
            delete api_v1_artwork_save_url(@artwork_save)
          }.to change(ArtworkSave, :count).by(0)
        end

        it "responds with 401 unauthorized" do
          delete api_v1_artwork_save_url(@artwork_save)
          expect(response).to have_http_status(401)
        end
      end

      context "with Artwork id requests" do
        before :each do
          @other_user = create(:user)
          @artwork = create(:artwork)
          @other_user.saved_artworks << @artwork
        end

        it "does not destroy the requested ArtworkSave" do
          expect {
            delete api_v1_artwork_save_by_aic_id_url(@artwork.aic_id)
          }.to change(ArtworkSave, :count).by(0)
        end

        it "responds with 401 unauthorized" do
          delete api_v1_artwork_save_by_aic_id_url(@artwork.aic_id)
          expect(response).to have_http_status(401)
        end

        it "does not destroy the requested ArtworkSave" do
          expect {
            delete api_v1_artwork_save_by_artwork_id_url(@artwork.id)
          }.to change(ArtworkSave, :count).by(0)
        end

        it "responds with 401 unauthorized" do
          delete api_v1_artwork_save_by_artwork_id_url(@artwork.id)
          expect(response).to have_http_status(401)
        end
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "access to ArtworkSaves"
    it_behaves_like "no destruction access to non-owned ArtworkSaves"
  end

  describe "unauthenticated access" do
    it_behaves_like "no access to ArtworkSaves"
  end
end
