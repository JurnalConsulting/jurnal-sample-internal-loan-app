class CreateOptions < ActiveRecord::Migration[5.0]
  def change
    create_table :options do |t|
      t.string :opt_title
      t.string :opt_buss_dur
      t.string :opt_buss_type
      t.string :opt_loan

      t.string :opt_title_id
      t.string :opt_buss_dur_id
      t.string :opt_loan_id

      t.string :opt_cities

      t.timestamps
    end
  end
end
