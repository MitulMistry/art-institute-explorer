class CreateCollectionArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_artworks do |t|
      t.integer :collection_id, null: false
      t.integer :artwork_id, null: false

      t.index :collection_id
      t.index :artwork_id

      t.timestamps
    end
  end
end
