require 'rails_helper'

RSpec.describe Artwork, type: :model do
  it "has a valid factory" do
    # Using FactoryBot syntax methods in rails_helper.rb
    expect(build(:artwork)).to be_valid
  end

  describe "associations" do
    # Using shoulda-matchers
    it { should have_many(:collection_artworks) }
    it { should have_many(:collections) }
  end

  describe "validations" do
    context "required validations" do
      it { should validate_presence_of(:aic_id) }
      it { should validate_numericality_of(:aic_id).
        only_integer.is_greater_than_or_equal_to(1).is_less_than_or_equal_to(99999) }
      it { should validate_presence_of(:image_id) }
      it { should validate_length_of(:image_id).is_at_most(1000) }
      it { should validate_presence_of(:image_url_prefix) }
      it { should validate_length_of(:image_url_prefix).is_at_most(1000) }
    end

    context "optional validations" do
      it { should validate_length_of(:title).is_at_most(300) }
      it { should validate_length_of(:artist_title).is_at_most(300) }
      it { should validate_length_of(:alt_text).is_at_most(1000) }
    end
  end
end
