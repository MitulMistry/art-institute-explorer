class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.text :bio
      t.string :password_digest, null: false

      t.index :username, unique: true
      t.index :email, unique: true

      t.timestamps
    end
  end
end
