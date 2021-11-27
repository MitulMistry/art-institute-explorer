require 'rails_helper'

RSpec.describe CollectionLike, type: :model do
  it "has a valid factory" do
    # Using FactoryBot syntax methods in rails_helper.rb
    expect(build(:collection_like)).to be_valid
  end

  it "has an invalid child factory" do
    expect(build(:invalid_collection_like)).to be_invalid
  end

  describe "associations" do
    # Using shoulda-matchers
    it { should belong_to(:user) }
    it { should belong_to(:collection) }
  end
end
