 require 'rails_helper'

RSpec.describe "/users", type: :request do

  # A hash of valid attributes for User model (Using FactoryBot)
  # attributes_for creates a params hash, mimicking the hash from a form
  let(:valid_attributes) {
    attributes_for(:user)
  }

  # A hash of invalid attributes for User model (Using FactoryBot)
  let(:invalid_attributes) {
    attributes_for(:invalid_user)
  }

  # A hash of new attributes for User model (Using FactoryBot)
  let(:new_attributes) {
    attributes_for(:user,
      username: "updated_user",
      email: "updated@email.com",
      bio: "updated bio"
    )
  }

  shared_examples_for "public access to users" do
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
        expect(json["users"].any? { |hash| hash["username"] == user1.username }).to be true
        expect(json["users"].any? { |hash| hash["username"] == user2.username }).to be true
        expect(json["users"].any? { |hash| hash["username"] == user3.username }).to be true
      end
    end

    describe "GET /show" do
      it "responds with a JSON formatted user with SavedArtworks and Collections" do
        user = create(:user)
        artwork = create(:artwork)
        user.saved_artworks << artwork
        collection = create(:collection, user_id: user.id)

        get api_v1_user_url(user)
        expect(response).to be_successful

        # Returns a user hash
        json = JSON.parse(response.body)
        expect(json["username"]).to eq(user.username)
        expect(json["saved_artworks"][0]["title"]).to eq(artwork.title)
        expect(json["collections"][0]["title"]).to eq(collection.title)
      end
    end
  end

  shared_examples_for "access to user creation" do
    describe "POST /create" do
      context "with valid parameters" do
        it "creates a new user" do
          expect {
            post api_v1_users_url, params: { user: valid_attributes }
          }.to change(User, :count).by(1)
        end

        it "responds with the created user in JSON format" do
          post api_v1_users_url, params: { user: valid_attributes }
          json = JSON.parse(response.body)
          expect(json["username"]).to eq User.last.username
        end
      end

      context "with invalid parameters" do
        it "does not create a new user" do
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
  end

  # Define @user before using these tests
  shared_examples_for "full modification access to owned user" do
    describe "PATCH /update" do
      context "with valid parameters" do
        before :each do
          patch api_v1_user_url(@user), params: { user: new_attributes }
        end

        it "updates the requested user" do
          @user.reload
          expect(@user.username).to eq("updated_user")
          expect(@user.email).to eq("updated@email.com")
          expect(@user.bio).to eq("updated bio")
        end

        it "responds with the updated user in JSON format" do
          expect(response).to be_successful

          json = JSON.parse(response.body)
          expect(json["username"]).to eq("updated_user")
        end
      end

      context "with invalid parameters" do
        it "responds with an error in JSON format" do
          patch api_v1_user_url(@user), params: { user: invalid_attributes }
          expect(response).to have_http_status(422)

          json = JSON.parse(response.body)
          expect(json["username"]).to include("can't be blank")
        end
      end
    end

    describe "DELETE /destroy" do
      it "destroys the requested user" do
        expect {
          delete api_v1_user_url(@user)
        }.to change(User, :count).by(-1)
      end

      it "responds successfully" do
        delete api_v1_user_url(@user)
        expect(response).to be_successful
      end
    end
  end

  # Define @user before using these tests
  shared_examples_for "no modification access to non-owned users" do
    before :each do
      @user2 = create(:user)
    end

    it "does not change the user's attributes" do
      username = @user2.username
      email = @user2.email
      bio = @user2.bio
      password_digest = @user2.password_digest

      patch api_v1_user_url(@user2), params: { user: new_attributes }
      @user2.reload
      expect(@user2.username).to eq(username)
      expect(@user2.email).to eq(email)
      expect(@user2.bio).to eq(bio)
      expect(@user2.password_digest).to eq(password_digest)
    end

    it "responds with 403 forbidden" do
      patch api_v1_user_url(@user2), params: { user: new_attributes }
      expect(response).to have_http_status(403)
    end
  end

  describe "authenticated user access" do
    before :each do
      @user = create_user_and_login
    end

    it_behaves_like "public access to users"
    it_behaves_like "full modification access to owned user"
    it_behaves_like "no modification access to non-owned users"
  end

  describe "unauthenticated access" do
    it_behaves_like "public access to users"
    it_behaves_like "access to user creation"

    describe "PATCH /update" do
      it "requires login" do
        user = create(:user)
        patch api_v1_user_url(user), params: { user: valid_attributes }
        expect(response).to have_http_status(403)

        json = JSON.parse(response.body)
        expect(json).to include("Forbidden")
      end
    end
  end
end
