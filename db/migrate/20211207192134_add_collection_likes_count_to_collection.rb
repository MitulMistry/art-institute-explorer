class AddCollectionLikesCountToCollection < ActiveRecord::Migration[6.1]
  def change
    add_column :collections, :collection_likes_count, :integer
  end
end
