class FormMailer < ApplicationMailer
  helper PageHelper
  default from: StaticEnv::MAIL_FROM

  def send_form_mailer(user,form)
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

    # Get Last 3 months from today report date
    @last_month = ((Date.today).end_of_month - 1.month).strftime('%d/%m/%Y')
    @last_3_month = ((Date.today).at_beginning_of_month - 3.month).strftime('%d/%m/%Y')
    @jurnal_balance_sheet_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "balance_sheet?access_token="+ @access_token + "&compare=monthly&compare_type=custom&period=2&end_date="+ @last_month))

    @jurnal_profit_loss_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "profit_and_loss?access_token="+ @access_token + "&compare_type=custom&period=2&start_date="+ (Date.today - 1.month).at_beginning_of_month.strftime('%d/%m/%Y') +"&end_date="+ (Date.today - 1.month).end_of_month.strftime('%d/%m/%Y') ))

    @jurnal_cash_flow_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "cash_flow?access_token="+ @access_token + "&compare_type=custom&period=2&start_date="+ (Date.today - 1.month).at_beginning_of_month.strftime('%d/%m/%Y') +"&end_date="+ (Date.today - 1.month).end_of_month.strftime('%d/%m/%Y') ))
    
    @jurnal_sales_lists_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "sales_lists?access_token="+ @access_token + "&start_date="+ (Date.today - 3.month).at_beginning_of_month.strftime('%d/%m/%Y') +"&end_date="+ (Date.today - 1.month).end_of_month.strftime('%d/%m/%Y') ))

    # Add Excel to Zip
    compressed_filestream = Zip::ZipOutputStream.write_buffer(::StringIO.new(''), Zip::TraditionalEncrypter.new(StaticEnv::LOAN_MAIL_PASS)) do |zos|
        content = render_to_string layout: false, handlers: [:axlsx], formats: [:xlsx], template: "forms/show"

        zos.put_next_entry("Jurnal_LOAN_#{@form.form_name}_#{@form.id}.xlsx")
        zos.print content
      end
      compressed_filestream.rewind

    attachments["Jurnal_LOAN_#{@form.form_name}_#{@form.id}.zip"] = compressed_filestream.read
    # mail(to: StaticEnv::LOAN_MAIL , subject: 'LOAN Form', cc: StaticEnv::JURNAL_MAIL )
    mail(to: StaticEnv::LOAN_MAIL , subject: 'LOAN Form')
    NotifMailer.after_send_form(@user, @form).deliver!
  end
  # def convert_excel(form)
  #   xlsx = render_to_string layout: false, handlers: [:axlsx], formats: [:xlsx], template: "forms/show", locals: {form: form}
  #   attachment = Base64.encode64(xlsx)
  #   attachments["Users.xlsx"] = {mime_type: Mime::XLSX, content: attachment, encoding: 'base64'}
  # end

end
