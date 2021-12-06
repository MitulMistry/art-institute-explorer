require 'rails_helper'

RSpec.describe ArtworkSave, type: :model do
  describe "associations" do
    # Using shoulda-matchers
    it { should belong_to(:user) }
    it { should belong_to(:artwork) }
  end

  describe "class methods" do
    context "##new_by_aic_id"
    it "returns a valid new ArtworkSave using an aic_id" do
      VCR.use_cassette("artwork_save_grande_jatte") do
        user = create(:user)
        expect(ArtworkSave.new_by_aic_id(user.id, 27992)).to be_valid
      end
    end
  end
end
