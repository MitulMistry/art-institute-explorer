class CreateCollectionLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :collection_likes do |t|
      t.string :user_id
      t.string :collection_id

      t.timestamps
    end
  end
end
