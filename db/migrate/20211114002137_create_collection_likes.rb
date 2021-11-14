class CreateCollectionLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_likes do |t|
      t.integer :user_id, null: false
      t.integer :collection_id, null: false

      t.index :user_id
      t.index :collection_id

      t.timestamps
    end
  end
end
