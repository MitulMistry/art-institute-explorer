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
        only_integer.is_greater_than_or_equal_to(1).is_less_than_or_equal_to(999999) }
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

  describe "class methods" do
    context "##find_or_create_by_aic_id" do
      before :each do
        @aic_id = 27992
      end

      it "finds the correct Artwork using an aic_id if it exists" do
        VCR.use_cassette("artwork_save_grande_jatte") do
          artwork = create(:artwork, aic_id: @aic_id)
          found_artwork = Artwork.find_or_create_by_aic_id(@aic_id)
          expect(found_artwork).to be_valid
          expect(found_artwork.aic_id).to eq(@aic_id)
        end
      end

      it "doesn't create an Artwork if it exists" do
        VCR.use_cassette("artwork_save_grande_jatte") do
          artwork = create(:artwork, aic_id: @aic_id)
          expect {
            Artwork.find_or_create_by_aic_id(@aic_id)
          }.to change(Artwork, :count).by(0)
        end
      end
      
      it "creates an Artwork using an aic_id if it doesn't exist" do
        VCR.use_cassette("artwork_save_grande_jatte") do
          expect {
            Artwork.find_or_create_by_aic_id(@aic_id)
          }.to change(Artwork, :count).by(1)
        end
      end

      it "returns the correctly created Artwork using an aic_id if it doesn't exist" do
        VCR.use_cassette("artwork_save_grande_jatte") do
          artwork = Artwork.find_or_create_by_aic_id(@aic_id)
          expect(artwork).to be_valid
          expect(artwork.aic_id).to eq(@aic_id)
        end
      end
    end
  end
end
