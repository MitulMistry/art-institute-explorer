require 'rails_helper'

RSpec.describe CollectionComment, type: :model do
  it "has a valid factory" do
    # Using FactoryBot syntax methods in rails_helper.rb
    expect(build(:collection_comment)).to be_valid
  end

  describe "associations" do
    # Using shoulda-matchers
    it { should belong_to(:user) }
    it { should belong_to(:collection) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:body)}
      it { should validate_length_of(:body).is_at_most(500)}          
    end
  end
end
