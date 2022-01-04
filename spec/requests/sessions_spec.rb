require 'rails_helper'

RSpec.describe "/sessions", type: :request do
  describe "POST /create" do
    before :each do
      @password = "password"
      @user = create(:user, password: @password)
    end

    context "with valid password" do
      it "creates a new Session and responds with a JSON formatted user" do
        post api_v1_sessions_path, params: {
          email: @user.email,
          password: @password
        }

        expect(response).to be_successful

        json = JSON.parse(response.body)
        
        expect(json["id"]).to eq(@user.id)
        expect(json["username"]).to eq(@user.username)
        expect(json["email"]).to eq(@user.email)
        expect(json["bio"]).to eq(@user.bio)
      end

      it "responds with a JSON formatted user with saved Artworks aic_ids" do
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        @user.saved_artworks << artwork1
        @user.saved_artworks << artwork2

        post api_v1_sessions_path, params: {
          email: @user.email,
          password: @password
        }
        
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json).to have_key("saved_artworks_aic_ids")
        ids = json["saved_artworks_aic_ids"]

        expect(ids.length).to eq(2)
        expect(ids).to include(artwork1.aic_id)
        expect(ids).to include(artwork2.aic_id)
      end

      it "responds with a JSON formatted user with liked Collections ids" do
        collection1 = create(:collection)
        collection2 = create(:collection)
        @user.liked_collections << collection1
        @user.liked_collections << collection2

        post api_v1_sessions_path, params: {
          email: @user.email,
          password: @password
        }
        
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json).to have_key("liked_collections_ids")
        ids = json["liked_collections_ids"]

        expect(ids.length).to eq(2)
        expect(ids).to include(collection1.id)
        expect(ids).to include(collection2.id)
      end
    end

    context "with invalid password" do
      it "does not create a new Session" do
        post api_v1_sessions_path, params: {
          email: @user.email,
          password: "wrong_password"
        }

        expect(response).to have_http_status(401)

        json = JSON.parse(response.body)
        expect(json).to include("Invalid email/password")
      end
    end
  end

  describe "DELETE /logout (destroy)" do
    context "with valid logged in user" do
      it "deletes Session" do
        user = create_user_and_login

        delete api_v1_sessions_path
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json["username"]).to eq(user.username)
      end
    end

    context "with no valid logged in user" do
      it "responds with an error in JSON format" do
        delete api_v1_sessions_path
        expect(response).to have_http_status(404)

        json = JSON.parse(response.body)
        expect(json).to include("Not signed in")
      end
    end
  end
end
