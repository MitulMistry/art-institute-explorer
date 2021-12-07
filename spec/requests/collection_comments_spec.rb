require 'rails_helper'

RSpec.describe "CollectionComments", type: :request do
  let(:valid_attributes) {
    attributes_for(:collection_comment, collection_id: create(:collection).id)
  }

  let(:invalid_attributes) {
    attributes_for(:invalid_collection_comment, collection_id: create(:collection).id)
  }

  let(:new_attributes) {
    attributes_for(:collection_comment,
      body: "updated comment"
    )
  }

  shared_examples_for "access to CollectionComment creation" do
    describe "POST /create" do
      context "with valid parameters" do
        it "creates a new CollectionComment" do
          expect {
            post api_v1_collection_comments_url, params: { collection_comment: valid_attributes }
          }.to change(CollectionComment, :count).by(1)
        end

        it "responds with the created CollectionComment in JSON format" do
          post api_v1_collection_comments_url, params: { collection_comment: valid_attributes }
          json = JSON.parse(response.body)
          expect(json["body"]).to eq(CollectionComment.last.body)
        end
      end

      context "with invalid parameters" do
        it "does not create a new CollectionComment" do
          expect {
            post api_v1_collection_comments_url, params: { collection_comment: invalid_attributes}
          }.to change(CollectionComment, :count).by(0)
        end

        it "responds with an error in JSON format" do
          post api_v1_collection_comments_url, params: { collection_comment: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["body"]).to include("can't be blank")
        end
      end
    end
  end

  shared_examples_for "modification access to owned CollectionComments" do
    before :each do
      @collection_comment = create(:collection_comment, user: (@user || create(:user)))
    end

    describe "PATCH /update" do     
      context "with valid parameters" do
        before :each do          
          patch api_v1_collection_comment_url(@collection_comment), params: { collection_comment: new_attributes }
        end

        it "updates the requested Collection" do          
          @collection_comment.reload
          expect(@collection_comment.body).to eq(new_attributes[:body])
        end

        it "responds with the updated Collection in JSON format" do
          expect(response).to be_successful

          json = JSON.parse(response.body)
          expect(json["body"]).to eq(new_attributes[:body])
        end
      end

      context "with invalid parameters" do
        it "responds with an error in JSON format" do
          patch api_v1_collection_comment_url(@collection_comment), params: { collection_comment: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["body"]).to include("can't be blank")
        end
      end
    end

    describe "DELETE /destroy" do
      it "destroys the requested Collection" do
        expect {
          delete api_v1_collection_comment_url(@collection_comment)
        }.to change(CollectionComment, :count).by(-1)
      end

      it "responds successfully" do
        delete api_v1_collection_comment_url(@collection_comment)
        expect(response).to be_successful
      end
    end
  end

  shared_examples_for "no modification access to non-owned CollectionComments" do
    before :each do
      @user2 = create(:user)
      @collection_comment = create(:collection_comment, user: @user2)
    end

    describe "PATCH /update" do    
      it "does not update the requested CollectionComment" do
        body = @collection_comment.body
        user_id = @collection_comment.user_id

        patch api_v1_collection_comment_url(@collection_comment), params: { collection_comment: valid_attributes }
        @collection_comment.reload
        expect(@collection_comment.body).to eq(body)
        expect(@collection_comment.user_id).to eq(user_id)
      end

      it "responds with 403 forbidden" do
        patch api_v1_collection_comment_url(@collection_comment), params: { collection_comment: valid_attributes }
        expect(response).to have_http_status(403)
      end
    end

    describe "DELETE /destroy" do
      it "does not destroy the requested CollectionComment" do
        expect {
          delete api_v1_collection_comment_url(@collection_comment)
        }.to change(Collection, :count).by(0)
      end

      it "responds with 403 forbidden" do
        delete api_v1_collection_comment_url(@collection_comment)
        expect(response).to have_http_status(403)
      end
    end
  end

  shared_examples_for "no creation or modification access to CollectionComments" do
    describe "POST /create" do
      it "does not create the Collection" do
        expect {
          post api_v1_collection_comments_url, params: { collection_comment: valid_attributes }
        }.to change(CollectionComment, :count).by(0)
      end

      it "responds with 401 unauthorized" do
        post api_v1_collection_comments_url, params: { collection_comment: valid_attributes }
        expect(response).to have_http_status(401)
      end
    end

    describe "PATCH /update" do
      before :each do
        @collection_comment = create(:collection_comment)
      end

      it "does not update the requested CollectionComment" do
        body = @collection_comment.body
        user_id = @collection_comment.user_id

        patch api_v1_collection_comment_url(@collection_comment), params: { collection_comment: valid_attributes }
        @collection_comment.reload
        expect(@collection_comment.body).to eq(body)
        expect(@collection_comment.user_id).to eq(user_id)
      end

      it "responds with 401 unauthorized" do
        patch api_v1_collection_comment_url(@collection_comment), params: { collection_comment: valid_attributes }
        expect(response).to have_http_status(401)
      end
    end

    describe "DELETE /destroy" do
      before :each do
        @collection_comment = create(:collection_comment)
      end

      it "does not destroy the requested CollectionComment" do
        expect {
          delete api_v1_collection_comment_url(@collection_comment)
        }.to change(CollectionComment, :count).by(0)
      end

      it "responds with 401 unauthorized" do        
        delete api_v1_collection_comment_url(@collection_comment)
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "access to CollectionComment creation"
    it_behaves_like "modification access to owned CollectionComments"
    it_behaves_like "no modification access to non-owned CollectionComments"
  end

  describe "unauthenticated access" do
    it_behaves_like "no creation or modification access to CollectionComments"
  end
end
