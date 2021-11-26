class AddAicIdToArtworks < ActiveRecord::Migration[6.1]
  def change
    add_column :artworks, :aic_id, :integer, null: false
    add_index :artworks, :aic_id, unique: true
  end
end
