class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :message
      t.references :receiver, index: true
      t.references :sender, index: true

      t.timestamps null: false
    end
  end
end
