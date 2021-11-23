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
end
