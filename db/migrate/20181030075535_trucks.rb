class Trucks < ActiveRecord::Migration[5.2]
  def change
    create_table :trucks do |t|
      t.string :trucktype
      t.timestamps
    end

    add_reference :events, :truck, index: true, foreign_key: true
  end
end
