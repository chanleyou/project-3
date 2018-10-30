class NewEventLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :address, :text
    add_column :events, :postcode, :integer
    add_column :events, :lat, :decimal, precision: 10, scale: 8
    add_column :events, :lng, :decimal, precision: 11, scale: 8
  end
end
