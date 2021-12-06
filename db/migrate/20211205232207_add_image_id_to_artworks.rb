class AddImageIdToArtworks < ActiveRecord::Migration[6.1]
  def change
    add_column :artworks, :image_id, :string, null: false
  end
end
