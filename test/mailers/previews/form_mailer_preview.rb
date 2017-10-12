# Preview all emails at http://localhost:3000/rails/mailers/form_mailer
class FormMailerPreview < ActionMailer::Preview
  def form_mailer_preview
    # insert dummy access_token here
    @access_token = ''
    
    @jurnal_curr_company = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/active?access_token="+ @access_token))
    @jurnal_curr_company_id =  @jurnal_curr_company["company"]["id"]
    @jurnal_company_data = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "companies/#{@jurnal_curr_company_id}?access_token="+ @access_token))
    # Get Last 3 months from today report date
    @last_month = ((Date.today).end_of_month - 1.month).strftime('%d/%m/%Y')
    @last_3_month = ((Date.today).at_beginning_of_month - 3.month).strftime('%d/%m/%Y')
    @jurnal_balance_sheet_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "balance_sheet?access_token="+ @access_token + "&compare=monthly&compare_type=custom&period=2&end_date="+ @last_month))

    @jurnal_profit_loss_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "profit_and_loss?access_token="+ @access_token + "&compare_type=custom&period=2&start_date="+ (Date.today - 1.month).at_beginning_of_month.strftime('%d/%m/%Y') +"&end_date="+ (Date.today - 1.month).end_of_month.strftime('%d/%m/%Y') ))

    @jurnal_cash_flow_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "cash_flow?access_token="+ @access_token + "&compare_type=custom&period=2&start_date="+ (Date.today - 1.month).at_beginning_of_month.strftime('%d/%m/%Y') +"&end_date="+ (Date.today - 1.month).end_of_month.strftime('%d/%m/%Y') ))
    
    @jurnal_sales_lists_last_3_month = JSON.load(open(StaticEnv::JURNAL_BASE_PATH + "sales_lists?access_token="+ @access_token + "&start_date="+ (Date.today - 3.month).at_beginning_of_month.strftime('%d/%m/%Y') +"&end_date="+ (Date.today - 1.month).end_of_month.strftime('%d/%m/%Y') ))

    FormMailer.send_form_mailer(User.first, Form.first, @jurnal_company_data, @jurnal_balance_sheet_last_3_month, @jurnal_profit_loss_last_3_month, @jurnal_cash_flow_last_3_month, @jurnal_sales_lists_last_3_month)
  end
end