class PageController < ApplicationController
  before_action :allow_iframe_requests

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end

  def home
    @users = User.all
    if !user_signed_in? && params[:access_token].blank?
      redirect_to sync_response_path
    elsif user_signed_in?
      @drafts = Form.where(:user_id => current_user.id,:form_status => nil)
      @submitted = Form.where(:user_id => current_user.id,:form_status => true)
    end
  end

  def check_current_user
    if user_signed_in?
      @drafts = Form.where(:user_id => current_user.id,:form_status => nil)
      @submitted = Form.where(:user_id => current_user.id,:form_status => true)
      flash[:success] = "Welcome back!"
    else
      flash.now[:alert] = "Please sign in"
      redirect_to sync_response_path
    end
  end

  def sync_response
    if user_signed_in?
      @curr_access_token = current_user.access_token
    elsif !params[:access_token].blank?
      @curr_access_token = params[:access_token]
      @user_email = (@curr_access_token)+ '@email'
      @user_pass = @curr_access_token

      begin
        @jurnal_source = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "users?access_token="+ @curr_access_token))
        @jurnal_source_id_comp = @jurnal_source["users"][0]["active_company"]["id"]
        @jurnal_company_data = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/active?access_token="+ @curr_access_token))
        @jurnal_locale = @jurnal_company_data["company"]["language"]["id"]

        if @jurnal_locale == 1
          I18n.locale = :en
        end

        @jurnal_source_id = @jurnal_source["users"][0]["id"]
        @user_dont_exist = User.where(:access_token => @curr_access_token).blank?
    
        if @user_dont_exist
          @new_user = User.create(:jurnal_id => @jurnal_source_id, :email => @user_email,:password => @user_pass, :access_token => @curr_access_token)
                
          bypass_sign_in(@new_user)
          redirect_to root_path
        else
          @user_exist = User.where(:access_token => @curr_access_token)
          sign_in(@user_exist.first)
          redirect_to root_path
        end

        rescue OpenURI::HTTPError => error
        if error.io.status[0] == '401'
          render :file=>'public/401', :status => 401
        elsif error.io.status[0] == '406'
          render :file=>'public/406', :status => 406
        end
      end
    end
  end
  
  protected
    def authenticate_user!
      redirect_to sync_response_path unless user_signed_in?
    end

end
