ActiveAdmin.register Form, as: "Form Lists" do
  index do
    column :id
    column "User Access Token" do |u|
      u.user.access_token
    end
    column "Updated at", :updated_at
    column "Status", :form_status
    column "User Title", :form_title
    column "Name", :form_name
    column "Address", :form_address
    column "City", :form_city
    column "Telephone", :form_telephone
    column "Email", :form_email
    column "Bussiness Duration", :form_bussiness_duration
    column "Bussiness Type", :form_bussiness_type
    column "Loan Amount", :form_loan_amount
    column "Friend Title", :form_friend_title
    column "Friend Name", :form_friend_name
    column "Friend Address", :form_friend_address
    column "Friend city", :form_friend_city
    column "Friend Telephone", :form_friend_telephone
    column "Friend Handphone", :form_friend_handphone
    column "Friend Email", :form_friend_email
    actions
  end

  filter :form_status
  filter :updated_at
  filter :user_access_token , :as => :string
end