class CreateCategoryTypes < ActiveRecord::Migration
  def change
    create_table :category_types do |t|
      t.string :banner
      t.string :name
      t.text :description
      t.string :urlpath

      t.timestamps null: false
    end
  end
end
