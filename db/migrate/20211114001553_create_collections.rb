class CreateCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :collections do |t|
      t.string :title, null: false
      t.text :description
      t.integer :user_id, null: false

      t.index :user_id

      t.timestamps
    end
  end
end
