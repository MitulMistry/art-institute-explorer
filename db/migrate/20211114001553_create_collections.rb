class CreateCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :collections do |t|
      t.string :title
      t.string :description
      t.string :user_id

      t.timestamps
    end
  end
end
