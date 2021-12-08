require 'rails_helper'

RSpec.describe "/sessions", type: :request do
  describe "POST /create" do
    before :each do
      @password = "password"
      @user = create(:user, password: @password)
    end

    context "with valid password" do
      it "creates a new Session" do
        post api_v1_sessions_path, params: {
          username: @user.username,
          password: @password
        }

        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json["username"]).to eq(@user.username)
      end
    end

    context "with invalid password" do
      it "does not create a new Session" do
        post api_v1_sessions_path, params: {
          username: @user.username,
          password: "wrong_password"
        }

        expect(response).to have_http_status(401)

        json = JSON.parse(response.body)
        expect(json).to include("Invalid username/password")
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
