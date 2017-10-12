class OptionsController < ApplicationController
  before_action :set_option, only: [:show,:edit,:update,:destroy]

  def new
    @option = Option.new
  end

  def create
    @option = Option.new(option_params)
    @option.save
    redirect_to admin_customize_options_path
  end

  def show
  end

  def edit
  end

  def update
    @option.update(option_params)
    redirect_to admin_customize_options_path
  end

  def destroy
    @option.destroy
    flash[:success] = "Your option has been deleted!"
    redirect_to admin_customize_options_path
  end 

  private
    def set_option
      @option = Option.find(params[:id])
    end
    def option_params
      params.require(:option).permit(:opt_title, :opt_buss_dur, :opt_buss_type, :opt_loan, :opt_title_id, :opt_buss_dur_id, :opt_loan_id, :opt_cities)
    end
end
