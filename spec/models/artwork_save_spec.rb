require 'rails_helper'

RSpec.describe ArtworkSave, type: :model do
  describe "associations" do
    # Using shoulda-matchers
    it { should belong_to(:user) }
    it { should belong_to(:artwork) }
  end
end
