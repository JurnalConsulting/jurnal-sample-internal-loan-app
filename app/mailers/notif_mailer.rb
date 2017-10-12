class NotifMailer < ApplicationMailer
  default from: StaticEnv::MAIL_FROM

  def after_send_form(user, form)
    @user = user
    @form = form
    @access_token = @user.access_token
    begin
      @jurnal_curr_company = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/active?access_token="+ @access_token))
      @jurnal_curr_company_id =  @jurnal_curr_company["company"]["id"]
        @jurnal_company_data = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/#{@jurnal_curr_company_id}?access_token="+ @access_token))
      rescue OpenURI::HTTPError => error
        if error.io.status[0] == '406'
          render :file=>'public/406', :status => 406
        end
    end
    mail(to: StaticEnv::LOAN_NOTIF_MAIL , subject: 'Loan Notif Form')
  end
end
