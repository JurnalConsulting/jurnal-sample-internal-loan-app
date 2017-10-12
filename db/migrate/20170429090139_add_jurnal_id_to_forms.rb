class AddJurnalIdToForms < ActiveRecord::Migration[5.0]
  def change
    add_reference :forms, :user, foreign_key: true
  end
end
