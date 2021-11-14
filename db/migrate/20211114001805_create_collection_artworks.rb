class CreateCollectionArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_artworks do |t|
      t.string :collection_id
      t.string :artwork_id

      t.timestamps
    end
  end
end
