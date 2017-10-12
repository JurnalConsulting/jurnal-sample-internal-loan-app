class FormsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :get_api_form, only: [:new, :create, :update]
  before_action :owned_post, only: [:edit, :update, :destroy] 
  before_action :allow_iframe_requests
  
  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end

  def index
    @forms = Form.where(:user_id => current_user.id)
  end

  def new
    @user = current_user
    @form = current_user.forms.build
  end

  def create
    @form = current_user.forms.build(form_params)
    @user = current_user
    @access_token = current_user.access_token

    if params[:draft_btn]
      @form.form_status = false
    elsif params[:submit_btn]
      @form.form_status = true
    end

    if @form.save && params[:submit_btn]
      FormMailer.send_form_mailer(@user,@form).deliver
      flash[:success] = "Your form has been created!"
    elsif @form.save 
      flash[:success] = "Your form has been created!"
      redirect_to root_path
      
    else
      flash.now[:alert] = "Your new form couldn't be created!  Please check the form."
      render :new
    end
  end 

  def show
    # testing axlsx only
    # @user = current_user
    # respond_to do |format|
    #   format.html
    #   format.xlsx{
    #     response.headers['Content-Disposition'] = 'attachment; filename="user_form.xlsx"'
    #   }
    # end
  end 

  def edit 
  end 

  def update
    @user = current_user
    @access_token = @user.access_token
    if params[:draft_btn]
      @form.form_status = false
    elsif params[:submit_btn]
      @form.form_status = true
    end
    if @form.update(form_params) && params[:submit_btn]
      FormMailer.send_form_mailer(@user,@form).deliver
      flash[:success] = "Form updated."
    elsif @form.update(form_params)
      flash[:success] = "Form updated."
      redirect_to(root_path)
    else
      flash.now[:alert] = "Update failed.  Please check the form."
      render :edit
    end
  end 

  def destroy
    @form.destroy
    flash[:success] = "Your form has been deleted!"
    redirect_to root_path
  end 

  def owned_post  
    unless current_user == @form.user
      flash[:alert] = "That form doesn't belong to you!"
      redirect_to root_path
    end
  end 

  private
    def form_params  
      params.require(:form).permit(:form_name,:form_title,:form_address,:form_city,:form_telephone,:form_email,:form_bussiness_duration,:form_bussiness_type,:form_loan_amount,:form_friend_title,:form_friend_name,:form_friend_address,:form_friend_city,:form_friend_telephone,:form_friend_handphone,:form_friend_email)
    end 

    def set_post
      @form = Form.find(params[:id])
    end

    def get_api_form
      @check_user = User.where(:access_token => current_user.access_token)
      if @check_user.blank?
        redirect_to sync_response_path
      else
        @access_token = (@check_user.pluck :access_token).join(" ")
        begin
          @jurnal_curr_company = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/active?access_token="+ @access_token))
          @jurnal_curr_company_id =  @jurnal_curr_company["company"]["id"]
            @jurnal_company_data = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/#{@jurnal_curr_company_id}?access_token="+ @access_token))
          rescue OpenURI::HTTPError => error
            if error.io.status[0] == '406'
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
