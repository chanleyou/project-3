class AddDetailsToUsers < ActiveRecord::Migration[5.2]
	def change
		add_column :chefs, :username, :string
    add_column :chefs, :name, :string
		add_column :chefs, :description, :text
		add_column :customers, :username, :string
  end
end
