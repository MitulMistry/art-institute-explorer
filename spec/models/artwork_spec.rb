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
          expect(artwork.artist_title).to eq("Georges Seurat")
        end
      end
    end

    context "##find_or_create_by_aic_ids" do
      before :each do
        @aic_id1 = 27992
        @aic_id2 = 151424
      end

      it "finds the correct Artworks using aic_ids if they exist" do
        VCR.use_cassette("collections_create_with_aic_ids") do
          artwork1 = create(:artwork, aic_id: @aic_id1)
          artwork2 = create(:artwork, aic_id: @aic_id2)

          found_artworks = Artwork.find_or_create_by_aic_ids([@aic_id1, @aic_id2])

          expect(found_artworks.count).to eq(2)
          expect(found_artworks).to include(artwork1)
          expect(found_artworks).to include(artwork2)
        end
      end

      it "doesn't create Artworks if they exist" do
        VCR.use_cassette("collections_create_with_aic_ids") do
          create(:artwork, aic_id: @aic_id1)
          create(:artwork, aic_id: @aic_id2)
          
          expect {
            Artwork.find_or_create_by_aic_ids([@aic_id1, @aic_id2])
          }.to change(Artwork, :count).by(0)
        end
      end
      
      it "creates Artworks using aic_ids if they don't exist" do
        VCR.use_cassette("collections_create_with_aic_ids") do
          expect {
            Artwork.find_or_create_by_aic_ids([@aic_id1, @aic_id2])
          }.to change(Artwork, :count).by(2)
        end
      end

      it "returns the correctly created Artworks using aic_ids if they don't exist" do
        VCR.use_cassette("collections_create_with_aic_ids") do
          artworks = Artwork.find_or_create_by_aic_ids([@aic_id1, @aic_id2])

          expect(artworks.any? { |artwork| artwork["aic_id"] == 27992 }).to be true
          expect(artworks.any? { |artwork| artwork["artist_title"] == "Georges Seurat" }).to be true
          expect(artworks.any? { |artwork| artwork["aic_id"] == 151424 }).to be true
          expect(artworks.any? { |artwork| artwork["title"] == "Inventions of the Monsters" }).to be true
        end
      end
    end
  end
end
