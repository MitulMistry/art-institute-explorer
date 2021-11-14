require 'rails_helper'

RSpec.describe CollectionArtwork, type: :model do
  describe "associations" do
    # Using shoulda-matchers
    it { should belong_to(:collection) }
    it { should belong_to(:artwork) }
  end
end
