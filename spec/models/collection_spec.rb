require 'rails_helper'

RSpec.describe Collection, type: :model do
  it "has a valid factory" do
    # Using FactoryBot syntax methods in rails_helper.rb
    expect(build(:collection)).to be_valid
  end

  it "has an invalid child factory" do
    expect(build(:invalid_collection)).to be_invalid
  end

  describe "associations" do
    # Using shoulda-matchers
    it { should belong_to(:user) }
    it { should have_many(:collection_artworks) }
    it { should have_many(:artworks) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:title)}
      it { should validate_length_of(:title).is_at_most(300)}          
    end

    context "optional validations" do
      it { should validate_length_of(:description).is_at_most(1000)}
    end
  end
end
