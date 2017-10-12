class CreateForms < ActiveRecord::Migration[5.0]
  def change
    create_table :forms do |t|
      t.boolean :form_status
      t.string  :form_title
      t.string  :form_name
      t.text    :form_address
      t.string  :form_city
      t.string  :form_telephone
      t.string  :form_email
      t.string  :form_bussiness_duration
      t.string  :form_bussiness_type
      t.string  :form_loan_amount

      t.string  :form_friend_title
      t.string  :form_friend_name
      t.text    :form_friend_address
      t.string  :form_friend_city
      t.string  :form_friend_telephone
      t.string  :form_friend_handphone
      t.string  :form_friend_email
      t.timestamps
    end
  end
end
