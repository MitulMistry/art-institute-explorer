class CreateSavedArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :saved_artworks do |t|
      t.integer :user_id, null: false
      t.integer :artwork_id, null: false

      t.index :user_id
      t.index :artwork_id

      t.timestamps
    end
  end
end
