ActiveAdmin.register_page "Customize Options" do
  content do
    panel "Option Title" do
      table_for(Option.select(:opt_title, :opt_title_id,:id).where.not(["opt_title=? and opt_title_id=?","",""])) do
        column "Title", :opt_title
        column "Sebutan", :opt_title_id
        column "Action" do |x|
          link_to "Edit" , edit_option_path(x, :param => "title")
        end
        column "Delete" do |x|
          link_to "X" , option_path(x), :method=>"delete" 
        end
      end
    end

    panel "Option Bussiness Duration" do
      table_for(Option.select(:opt_buss_dur, :opt_buss_dur_id,:id).where.not(["opt_buss_dur=? and opt_buss_dur_id=?","",""])) do
        column "Bussiness Duration", :opt_buss_dur
        column "Durasi Bisnis", :opt_buss_dur_id
        column "Action" do |x|
          link_to "Edit" , edit_option_path(x, :param => "buss_dur")
        end
        column "Delete" do |x|
          link_to "X" , option_path(x), :method=>"delete" 
        end
      end
    end

    panel "Option Loan" do
      table_for(Option.select(:opt_loan, :opt_loan_id,:id).where.not(["opt_loan=? and opt_loan_id=?","",""])) do
        column "Loan", :opt_loan
        column "Hutang", :opt_loan_id
        column "Action" do |x|
          link_to "Edit" , edit_option_path(x, :param => "loan")
        end
        column "Delete" do |x|
          link_to "X" , option_path(x), :method=>"delete" 
        end
      end
    end

    panel "Option Bussiness Type" do
      table_for(Option.select(:opt_buss_type,:id).where.not(:opt_buss_type=>"")) do
        column "Bussiness Type", :opt_buss_type
        column "Action" do |x|
          link_to "Edit" , edit_option_path(x, :param => "buss_type")
        end
        column "Delete" do |x|
          link_to "X" , option_path(x), :method=>"delete" 
        end
      end
    end

    panel "Option Cities" do
      table_for(Option.select(:opt_cities,:id).where.not(:opt_cities=>"")) do
        column "List of City", :opt_cities
        column "Action" do |x|
          link_to "Edit" , edit_option_path(x, :param => "cities")
        end
        column "Delete" do |x|
          link_to "X" , option_path(x), :method=>"delete" 
        end
      end
    end
  end
end
