require 'rails_helper'

RSpec.describe "Collections", type: :request do

  let(:valid_attributes) {
    attributes_for(:collection, user: (@user || create(:user)))
  }

  let(:invalid_attributes) {
    attributes_for(:invalid_collection, user: (@user || create(:user)))
  }

  let(:new_attributes) {
    attributes_for(:collection,
      title: "updated_title",
      description: "updated description"
    )
  }

  shared_examples_for "public access to Collections" do
    describe "GET /index" do
      it "responds with a JSON formatted list of Collections" do
        collection1 = create(:collection)
        collection2 = create(:collection)
        collection3 = create(:collection)

        get api_v1_collections_url
        expect(response).to be_successful
        
        # Returns an array of hashes: [{id: 1, ...}, {id: 2, ...}]
        json = JSON.parse(response.body)
        # Check if any of the collection hashes contains the specified title
        # Can also be written: expect(json).to include(include("title" => collection1.title))
        expect(json.any? { |hash| hash["title"] == collection1.title }).to be true
        expect(json.any? { |hash| hash["title"] == collection2.title }).to be true
        expect(json.any? { |hash| hash["title"] == collection3.title }).to be true
      end
    end

    describe "GET /show" do
      it "responds with a JSON formatted collection" do
        collection = create(:collection)
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        collection.artworks << artwork1
        collection.artworks << artwork2

        get api_v1_collection_url(collection)
        expect(response).to be_successful

        # Returns a collection hash
        json = JSON.parse(response.body)
        expect(json["title"]).to eq(collection.title)
        expect(json["artworks"].any? { |hash| hash["aic_id"] == artwork1.aic_id }).to be true
        expect(json["artworks"].any? { |hash| hash["aic_id"] == artwork2.aic_id }).to be true
      end
    end
  end

  shared_examples_for "access to liked Collections" do
    describe "GET /liked" do
      it "responds with a JSON formatted list of liked Collections" do
        user2 = create(:user)
        collection1 = create(:collection, user: @user)
        collection2 = create(:collection, user: @user)
        collection3 = create(:collection, user: user2)

        get api_v1_collections_liked_url
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json.any? { |hash| hash["title"] == collection1.title }).to be true
        expect(json.any? { |hash| hash["title"] == collection2.title }).to be true
        expect(json.none? { |hash| hash["title"] == collection3.title }).to be true
      end
    end
  end

  shared_examples_for "no access to liked Collections" do
    describe "GET /liked" do
      it "responds with 403 forbidden" do
        get api_v1_collections_liked_url
        expect(response).to have_http_status(403)
      end
    end
  end

  shared_examples_for "access to Collection creation" do
    describe "POST /create" do
      context "with valid parameters" do
        it "creates a new Collection" do
          expect {
            post api_v1_collections_url, params: { collection: valid_attributes }
          }.to change(Collection, :count).by(1)
        end

        it "responds with the created Collection in JSON format" do
          post api_v1_collections_url, params: { collection: valid_attributes }
          json = JSON.parse(response.body)
          expect(json["title"]).to eq(Collection.last.title)
        end
      end

      context "with invalid parameters" do
        it "does not create a new Collection" do
          expect {
            post api_v1_collections_url, params: { collection: invalid_attributes}
          }.to change(User, :count).by(0)
        end

        it "responds with an error in JSON format" do
          post api_v1_collections_url, params: { collection: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["title"]).to include("can't be blank")
        end
      end
    end
  end

  shared_examples_for "modification access to owned Collections" do
    before :each do
      @collection = create(:collection, user: (@user || create(:user)))
    end

    describe "PATCH /update" do     
      context "with valid parameters" do
        before :each do          
          patch api_v1_collection_url(@collection), params: { collection: new_attributes }
        end

        it "updates the requested Collection" do          
          @collection.reload
          expect(@collection.title).to eq(new_attributes[:title])
          expect(@collection.description).to eq(new_attributes[:description])
        end

        it "responds with the updated Collection in JSON format" do
          expect(response).to be_successful

          json = JSON.parse(response.body)
          expect(json["title"]).to eq(new_attributes[:title])
        end
      end

      context "with invalid parameters" do
        it "responds with an error in JSON format" do
          patch api_v1_collection_url(@collection), params: { collection: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["title"]).to include("can't be blank")
        end
      end
    end

    describe "DELETE /destroy" do
      it "destroys the requested Collection" do
        expect {
          delete api_v1_collection_url(@collection)
        }.to change(Collection, :count).by(-1)
      end

      it "responds successfully" do
        delete api_v1_collection_url(@collection)
        expect(response).to be_successful
      end
    end
  end

  shared_examples_for "no modification access to non-owned Collections" do
    before :each do
      @user2 = create(:user)
      @collection = create(:collection, user: @user2)
    end

    describe "PATCH /update" do    
      it "does not update the requested Collection" do
        title = @collection.title
        description = @collection.description
        user_id = @collection.user_id

        patch api_v1_collection_url(@collection), params: { collection: valid_attributes }
        @collection.reload
        expect(@collection.title).to eq(title)
        expect(@collection.description).to eq(description)
        expect(@collection.user_id).to eq(user_id)
      end

      it "responds with 403 forbidden" do
        patch api_v1_collection_url(@collection), params: { collection: valid_attributes }
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE /destroy" do
      it "does not destroy the requested Collection" do
        expect {
          delete api_v1_collection_url(@collection)
        }.to change(Collection, :count).by(0)
      end

      it "responds with 403 forbidden" do
        delete api_v1_collection_url(@collection)
        expect(response).to have_http_status(403)
      end
    end
  end

  shared_examples_for "no creation or modification access to Collections" do
    describe "POST /create" do
      it "does not create the Collection" do
        expect {
          post api_v1_collections_url, params: { collection: valid_attributes }
        }.to change(Collection, :count).by(0)
      end

      it "responds with 403 forbidden" do
        post api_v1_collections_url, params: { collection: valid_attributes }
        expect(response).to have_http_status(403)
      end
    end

    describe "PATCH /update" do
      before :each do
        @collection = create(:collection)
      end

      it "does not update the requested Collection" do
        title = @collection.title
        description = @collection.description
        user_id = @collection.user_id

        patch api_v1_collection_url(@collection), params: { collection: valid_attributes }
        @collection.reload
        expect(@collection.title).to eq(title)
        expect(@collection.description).to eq(description)
        expect(@collection.user_id).to eq(user_id)
      end

      it "responds with 403 forbidden" do
        patch api_v1_collection_url(@collection), params: { collection: valid_attributes }
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE /destroy" do
      before :each do
        @collection = create(:collection)
      end

      it "does not destroy the requested Collection" do
        expect {
          delete api_v1_collection_url(@collection)
        }.to change(Collection, :count).by(0)
      end

      it "responds with 403 forbidden" do
        delete api_v1_collection_url(@collection)
        expect(response).to have_http_status(403)
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "public access to Collections"
    it_behaves_like "access to liked Collections"
    it_behaves_like "access to Collection creation"
    it_behaves_like "modification access to owned Collections"
    it_behaves_like "no modification access to non-owned Collections"
  end

  describe "unauthenticated access" do
    it_behaves_like "public access to Collections"
    it_behaves_like "no access to liked Collections"
    it_behaves_like "no creation or modification access to Collections"
  end
end
