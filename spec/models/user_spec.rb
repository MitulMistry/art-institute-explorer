require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid factory" do
    # Using FactoryBot syntax methods in rails_helper.rb
    expect(build(:user)).to be_valid
  end

  it "has an invalid child factory" do
    expect(build(:invalid_user)).to be_invalid
  end

  describe "associations" do
    # Using shoulda-matchers
    it { should have_many(:artwork_saves) }
    it { should have_many(:saved_artworks) }
    it { should have_many(:collections) }
    it { should have_many(:collection_likes) }
    it { should have_many(:liked_collections) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:username) }
      it { should validate_length_of(:username).is_at_least(3).is_at_most(40) }

      # validate_uniqueness_of matcher throws an error with database validations (in
      # migrations). Define a valid object to be tested (with FactoryBot) to fix this:
      # https://www.rubydoc.info/gems/shoulda-matchers/Shoulda%2FMatchers%2FActiveRecord%3Avalidate_uniqueness_of
      subject { build(:user) }
      it { should validate_uniqueness_of(:username) }

      it "has an alphanumeric username" do
        expect(build(:user, username: "testUser1")).to be_valid
        expect(build(:user, username: "test-user2")).to be_valid
        expect(build(:user, username: "test_user3")).to be_valid
        expect(build(:user, username: "test user4")).to be_invalid
        expect(build(:user, username: "testUser5$")).to be_invalid
      end

      it { should validate_presence_of(:email) }
      it { should validate_length_of(:email).is_at_most(100) }

      it "has a valid email" do
        expect(build(:user, email: "test123@email.com")).to be_valid
        expect(build(:user, email: "test123@email.net")).to be_valid
        expect(build(:user, email: "test123email.net")).to be_invalid
        expect(build(:user, email: "test123 @email.com")).to be_invalid
      end

      it { should have_secure_password }
      it { should validate_length_of(:password).is_at_least(5) }
      it { should validate_length_of(:password).is_at_most(40) }
    end

    context "image (avatar) validations" do
      it { should validate_content_type_of(:avatar).allowing("image/png", "image/jpeg", "image/jpg") }
      it { should validate_content_type_of(:avatar).rejecting("text/plain", "text/xml") }
      it { should validate_size_of(:avatar).less_than(1.megabytes) }
    end

    context "other validations" do
      it { should validate_length_of(:bio).is_at_most(500) }
    end
  end

  describe "instance methods" do
    context "#saved_artworks_aic_ids" do
      it "returns an array of aic_ids from the user's saved Artworks" do
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        user = create(:user)
        user.saved_artworks << artwork1
        user.saved_artworks << artwork2
        ids = user.saved_artworks_aic_ids

        expect(ids.length).to eq(2)
        expect(ids).to include(artwork1.aic_id)
        expect(ids).to include(artwork2.aic_id)
      end
    end

    context "#liked_collections_ids" do
      it "returns an array of ids from the user's liked Collections" do
        collection1 = create(:collection)
        collection2 = create(:collection)
        user = create(:user)
        user.liked_collections << collection1
        user.liked_collections << collection2
        ids = user.liked_collections_ids

        expect(ids.length).to eq(2)
        expect(ids).to include(collection1.id)
        expect(ids).to include(collection2.id)
      end
    end

    context "#ordered" do
      it "returns a list of users (newest first)" do
        user1 = create(:user)
        user2 = create(:user)
        user3 = create(:user)
        users = User.ordered

        expect(users.length).to eq(3)
        expect(users[0].id).to eq(user3.id)
        expect(users[1].id).to eq(user2.id)
        expect(users[2].id).to eq(user1.id)
      end
    end

    context "#ordered_collections" do
      it "returns a list of the user's owned collections (newest first)" do
        user = create(:user)
        collection1 = create(:collection, user_id: user.id)
        collection2 = create(:collection, user_id: user.id)
        collection3 = create(:collection, user_id: user.id)
        collection4 = create(:collection)
        collections = user.ordered_collections

        expect(collections.length).to eq(3)
        expect(collections[0].id).to eq(collection3.id)
        expect(collections[1].id).to eq(collection2.id)
        expect(collections[2].id).to eq(collection1.id)
      end
    end

    context "#ordered_liked_collections" do
      it "returns a list of the user's liked collections (newest first)" do
        user = create(:user)
        collection1 = create(:collection)
        collection2 = create(:collection)
        collection3 = create(:collection)
        collection4 = create(:collection)
        user.liked_collections << collection1
        user.liked_collections << collection2
        user.liked_collections << collection3
        collections = user.ordered_liked_collections

        expect(collections.length).to eq(3)
        expect(collections[0].id).to eq(collection3.id)
        expect(collections[1].id).to eq(collection2.id)
        expect(collections[2].id).to eq(collection1.id)
      end
    end

    context "#ordered_saved_artworks" do
      it "returns the user's saved Artworks ordered by newest join table (ArtworkSave)" do
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        artwork3 = create(:artwork)
        user = create(:user)
        user.saved_artworks << artwork2
        user.saved_artworks << artwork1
        user.saved_artworks << artwork3
        artworks = user.ordered_saved_artworks

        expect(artworks.length).to eq(3)
        expect(artworks[0].id).to eq(artwork3.id)
        expect(artworks[1].id).to eq(artwork1.id)
        expect(artworks[2].id).to eq(artwork2.id)
      end
    end
  end
end
