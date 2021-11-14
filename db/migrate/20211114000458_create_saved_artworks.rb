class CreateSavedArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :saved_artworks do |t|
      t.string :user_id
      t.string :artwork_id

      t.timestamps
    end
  end
end
