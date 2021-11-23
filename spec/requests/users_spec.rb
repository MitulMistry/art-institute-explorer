 require 'rails_helper'

RSpec.describe "/users", type: :request do  
  
  # A hash of valid attributes for User model (Using FactoryBot)
  let(:valid_attributes) {
    attributes_for(:user)
  }

  # A hash of invalid attributes for User model (Using FactoryBot)
  let(:invalid_attributes) {
    attributes_for(:invalid_user)
  }

  describe "GET /index" do
    it "responds with a JSON formatted list of users" do
      user1 = create(:user)
      user2 = create(:user)
      user3 = create(:user)

      get api_v1_users_url
      expect(response).to be_successful
      
      # Returns an array of hashes: [{id: 1, ...}, {id: 2, ...}]
      json = JSON.parse(response.body)
      # Check if any of the user hashes contains the specified username
      # Can also be written: expect(json).to include(include("username" => user1.username))
      expect(json.any? { |hash| hash["username"] == user1.username }).to be true
      expect(json.any? { |hash| hash["username"] == user2.username }).to be true
      expect(json.any? { |hash| hash["username"] == user3.username }).to be true
    end
  end

  describe "GET /show" do
    it "responds with a JSON formatted user" do
      user = create(:user)
      get api_v1_user_url(user)
      expect(response).to be_successful

      # Returns a user hash
      json = JSON.parse(response.body)
      expect(json["username"]).to eq user.username
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post api_v1_users_url, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it "responds with the created User in JSON format" do
        post api_v1_users_url, params: { user: valid_attributes }
        json = JSON.parse(response.body)
        expect(json["username"]).to eq User.last.username
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post api_v1_users_url, params: { user: invalid_attributes}
        }.to change(User, :count).by(0)
      end

      it "responds with an error in JSON format" do
        post api_v1_users_url, params: { user: invalid_attributes }
        expect(response).to have_http_status(422)

        json = JSON.parse(response.body)
        expect(json["username"]).to include("can't be blank")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      # A hash of new attributes for User model (Using FactoryBot)
      let(:new_attributes) {
        attributes_for(:user, username: "updated_user")
      }

      it "updates the requested user" do
        user = create(:user)
        patch api_v1_user_url(user), params: { user: new_attributes }
        user.reload
        expect(user.username).to eq("updated_user")
      end

      it "responds with the updated User in JSON format" do
        user = create(:user)
        patch api_v1_user_url(user), params: { user: new_attributes }
        expect(response).to be_successful

        json = JSON.parse(response.body)
        expect(json["username"]).to eq("updated_user")
      end
    end

    context "with invalid parameters" do
      it "responds with an error in JSON format" do
        user = create(:user)
        patch api_v1_user_url(user), params: { user: invalid_attributes }
        expect(response).to have_http_status(422)

        json = JSON.parse(response.body)
        expect(json["username"]).to include("can't be blank")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user" do
      user = create(:user)
      expect {
        delete api_v1_user_url(user)
      }.to change(User, :count).by(-1)
    end

    it "responds successfully" do
      user = create(:user)
      delete api_v1_user_url(user)
      expect(response).to be_successful
    end
  end
end
