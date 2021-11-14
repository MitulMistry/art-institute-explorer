class CreateCollectionComments < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_comments do |t|
      t.integer :user_id, null: false
      t.integer :collection_id, null: false
      t.text :body, null: false

      t.index :user_id
      t.index :collection_id

      t.timestamps
    end
  end
end
