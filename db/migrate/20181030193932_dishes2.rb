class Dishes2 < ActiveRecord::Migration[5.2]
  def change
    add_column :dishes, :course, :string
    add_column :dishes, :price, :decimal, precision: 8, scale: 2
  end
end
