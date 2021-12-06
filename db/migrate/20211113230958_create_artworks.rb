class CreateArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :title
      t.string :alt_text
      t.string :artist_title
      t.string :image_url_prefix, null: false

      t.timestamps
    end
  end
end
