ActiveAdmin.register User do
  controller do
    def permitted_params
      if !params[:user].blank?
        params[:user][:email] = params[:user][:access_token]+'@email'
      end
      params.permit(:utf8, :_method, :authenticity_token, :locale, :commit, :id,
        user: [:id, :name, :jurnal_id, :email, :password, :access_token]
      )
    end
  end

  index do
    column :id
    column "Created at", :created_at
    column "Jurnal Id", :jurnal_id
    column :access_token
    column ("Last Form Updated") do |f|
      if f.forms.blank?
        "This user has no form."
      else
        f.forms.last.updated_at
      end
    end
    column "Forms", :id do |id|
      link_to "Check Forms", admin_user_forms_path(id)
    end
    # column "Action", :id do |id|
    #   link_to "Create New Form", new_admin_user_form_path(id)
    # end
    actions
  end

  filter :id
  filter :jurnal_id
  filter :access_token
  filter :created_at
  # filter :form_status , :collection => Form.all.map(&:form_status), :as => :select

  form do |f|
    f.semantic_errors
    f.inputs do 
      f.input :id
      f.input :jurnal_id
      f.input :access_token
      f.input :password
    end
    f.actions
  end

  ActiveAdmin.register Form do
    actions :index, :destroy
    belongs_to :user
    permit_params :form_title, :form_name, :form_address, :form_city, :form_telephone, :form_email, :form_bussiness_duration, :form_bussiness_type, :form_loan_amount, :form_friend_title, :form_friend_name, :form_friend_address, :form_friend_city, :form_friend_telephone, :form_friend_handphone, :form_friend_email

    index do
      column :id
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

    form do |f|
      f.semantic_errors
      f.inputs do
        f.input :form_title, :as => :select, :collection => Option.pluck(:opt_title).compact.reject!(&:empty?)
        f.input :form_name
        f.input :form_address, :as => :select, :collection => Option.pluck(:opt_cities).compact.reject!(&:empty?)
        f.input :form_city
        f.input :form_telephone
        f.input :form_email
        f.input :form_bussiness_duration, :as => :select, :collection => Option.pluck(:opt_buss_dur).compact.reject!(&:empty?)
        f.input :form_bussiness_type, :as => :select, :collection => Option.pluck(:opt_buss_type).compact.reject!(&:empty?)
        f.input :form_loan_amount, :as => :select, :collection => Option.pluck(:opt_loan).compact.reject!(&:empty?)
        f.input :form_friend_title, :as => :select, :collection => Option.pluck(:opt_title).compact.reject!(&:empty?)
        f.input :form_friend_name
        f.input :form_friend_address
        f.input :form_friend_city, :as => :select, :collection => Option.pluck(:opt_cities).compact.reject!(&:empty?)
        f.input :form_friend_telephone
        f.input :form_friend_handphone
        f.input :form_friend_email
      end
      f.actions
    end

  end
end