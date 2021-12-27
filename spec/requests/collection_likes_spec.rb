require 'rails_helper'

RSpec.describe "/collection_likes", type: :request do
  let(:valid_attributes) {
    attributes_for(:collection_like, collection_id: create(:collection).id)
  }

  let(:invalid_attributes) {
    attributes_for(:invalid_collection_like, collection_id: build(:collection).id)
  }

  shared_examples_for "access to CollectionLike creation" do
    describe "POST /create" do
      context "with valid parameters" do
        it "creates a new CollectionLike" do
          expect {
            post api_v1_collection_likes_url, params: { collection_like: valid_attributes }
          }.to change(CollectionLike, :count).by(1)
        end

        it "responds with the Collection's number of likes in JSON format" do
          post api_v1_collection_likes_url, params: { collection_like: valid_attributes }
          json = JSON.parse(response.body)
          expect(json["collection_like_count"]).to eq(1)
        end
      end

      context "with invalid parameters" do
        it "does not create a new CollectionLike" do
          expect {
            post api_v1_collection_likes_url, params: { collection_like: invalid_attributes}
          }.to change(CollectionLike, :count).by(0)
        end

        it "responds with an error in JSON format" do
          post api_v1_collection_likes_url, params: { collection_like: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["collection"]).to include("must exist")
        end
      end

      context "with duplicate parameters" do
        before :each do
          @collection = create(:collection)
          @user.liked_collections << @collection
        end

        it "does not create a new CollectionLike" do
          expect {
            post api_v1_collection_likes_url, params: { collection_like:
              attributes_for(:collection_like, user_id: @user.id, collection_id: @collection.id)}
          }.to change(CollectionLike, :count).by(0)
        end

        it "responds with an error in JSON format" do
          post api_v1_collection_likes_url, params: { collection_like:
            attributes_for(:collection_like, user_id: @user.id, collection_id: @collection.id)}
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json).to include("Duplicate record")
        end
      end
    end
  end

  shared_examples_for "destruction access to owned CollectionLikes" do
    describe "DELETE /destroy" do
      context "with standard request" do
        before :each do
          @collection_like = create(:collection_like, user_id: (@user || create(:user)).id)
        end

        it "destroys the requested Collection" do
          expect {
            delete api_v1_collection_like_url(@collection_like)
          }.to change(CollectionLike, :count).by(-1)
        end

        it "responds successfully" do
          delete api_v1_collection_like_url(@collection_like)
          expect(response).to be_successful
        end
      end

      context "with Collection id request" do
        before :each do
          @collection = create(:collection)
          @user.liked_collections << @collection
        end
        
        it "destroys the requested CollectionLike by collection_id" do
          expect {
            delete api_v1_collection_like_by_collection_id_url(@collection.id)
          }.to change(CollectionLike, :count).by(-1)
        end

        it "responds successfully" do
          delete api_v1_collection_like_by_collection_id_url(@collection)
          expect(response).to be_successful
        end
      end
    end
  end

  shared_examples_for "no destruction access to non-owned CollectionLikes" do
    describe "DELETE /destroy" do
      context "with standard request" do
        before :each do
          @collection_like = create(:collection_like)
        end

        it "does not destroy the requested CollectionLike" do
          expect {
            delete api_v1_collection_like_url(@collection_like)
          }.to change(Collection, :count).by(0)
        end

        it "responds with 403 forbidden" do
          delete api_v1_collection_like_url(@collection_like)
          expect(response).to have_http_status(403)
        end
      end

      context "with Collection id request" do
        before :each do
          @other_user = create(:user)
          @collection = create(:collection)
          @other_user.liked_collections << @collection  
        end

        it "destroys the requested CollectionLike by collection_id" do
          expect {
            delete api_v1_collection_like_by_collection_id_url(@collection.id)
          }.to change(CollectionLike, :count).by(0)
        end

        it "responds with 404 not found" do
          delete api_v1_collection_like_by_collection_id_url(@collection.id)
          expect(response).to have_http_status(404)
        end
      end
    end
  end

  shared_examples_for "no creation or destruction access to CollectionLikes" do
    describe "POST /create" do
      it "responds with 401 unauthorized" do
        post api_v1_collection_likes_url, params: { collection_like: valid_attributes }
        expect(response).to have_http_status(401)
      end
    end

    describe "DELETE /destroy" do
      context "with standard request" do
        before :each do
          @collection_like = create(:collection_like)
        end

        it "does not destroy the requested CollectionLike" do
          expect {
            delete api_v1_collection_like_url(@collection_like)
          }.to change(CollectionLike, :count).by(0)
        end

        it "responds with 401 unauthorized" do
          delete api_v1_collection_like_url(@collection_like)
          expect(response).to have_http_status(401)
        end
      end

      context "with Collection id request" do
        before :each do
          @other_user = create(:user)
          @collection = create(:collection)
          @other_user.liked_collections << @collection  
        end

        it "destroys the requested CollectionLike by collection_id" do
          expect {
            delete api_v1_collection_like_by_collection_id_url(@collection.id)
          }.to change(CollectionLike, :count).by(0)
        end

        it "responds with 401 unauthorized" do
          delete api_v1_collection_like_by_collection_id_url(@collection.id)
          expect(response).to have_http_status(401)
        end
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "access to CollectionLike creation"
    it_behaves_like "destruction access to owned CollectionLikes"
    it_behaves_like "no destruction access to non-owned CollectionLikes"
  end

  describe "unauthenticated access" do
    it_behaves_like "no creation or destruction access to CollectionLikes"
  end
end
