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
    it { should have_many(:collection_comments) }
    it { should have_many(:collection_likes) }
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

  describe "instance methods" do
    context "#like_count" do
      it "returns the number of likes a Collection has" do
        collection = create(:collection)
        3.times { create(:collection_like, collection_id: collection.id) }
        expect(collection.like_count).to eq(3)
      end
    end

    context "#artworks_aic_ids" do
      it "returns an array of aic_ids for the Artworks in a Collection" do
        collection = create(:collection)
        artwork1 = create(:artwork)
        artwork2 = create(:artwork)
        collection.artworks << artwork1
        collection.artworks << artwork2
        expect(collection.artworks_aic_ids).to contain_exactly(artwork1.aic_id, artwork2.aic_id)
      end
    end

    context "#ordered" do
      it "returns a list of collections (newest first)" do
        collection1 = create(:collection)
        collection2 = create(:collection)
        collection3 = create(:collection)
        collections = Collection.ordered

        expect(collections.length).to eq(3)
        expect(collections[0].id).to eq(collection3.id)
        expect(collections[1].id).to eq(collection2.id)
        expect(collections[2].id).to eq(collection1.id)
      end
    end

    context "#randomized" do
      it "returns a list of randomized collections" do
        4.times { create(:collection) }        
        collections = Collection.randomized(3)

        expect(collections.length).to eq(3)
      end
    end

    context "#ordered_first_artworks" do
      before :each do
        @collection = create(:collection)
        @artwork1 = create(:artwork)
        @artwork2 = create(:artwork)
        @artwork3 = create(:artwork)
        @artwork4 = create(:artwork)
        @collection.artworks << @artwork1
        @collection.artworks << @artwork2
        @collection.artworks << @artwork3
        @collection.artworks << @artwork4
      end

      it "returns a list of artworks (oldest added first) with specified count" do        
        artworks = @collection.ordered_first_artworks(3)

        expect(artworks.length).to eq(3)
        expect(artworks[0].id).to eq(@artwork1.id)
        expect(artworks[1].id).to eq(@artwork2.id)
        expect(artworks[2].id).to eq(@artwork3.id)
      end

      it "returns a list of all artworks (oldest added first) with no specified count" do        
        artworks = @collection.ordered_first_artworks()

        expect(artworks.length).to eq(4)
        expect(artworks[0].id).to eq(@artwork1.id)
        expect(artworks[1].id).to eq(@artwork2.id)
        expect(artworks[2].id).to eq(@artwork3.id)
        expect(artworks[3].id).to eq(@artwork4.id)
      end
    end

    context "#ordered_collection_comments" do
      it "returns a list of collection comments (newest first)" do
        collection = create(:collection)
        comment1 = create(:collection_comment, collection_id: collection.id)
        comment2 = create(:collection_comment, collection_id: collection.id)
        comment3 = create(:collection_comment, collection_id: collection.id)

        comments = collection.ordered_collection_comments

        expect(comments.length).to eq(3)
        expect(comments[0].id).to eq(comment3.id)
        expect(comments[1].id).to eq(comment2.id)
        expect(comments[2].id).to eq(comment1.id)
      end
    end
  end
end
