class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale

  def self.force_ssl(options = {})
    host = options.delete(:host)
    before_filter(options) do
      if !request.ssl? && !Rails.env.development? &&
         !(respond_to?(:allow_http?) && allow_http?) && ENV['USE_HTTPS'] == "true"
        redirect_options = {:protocol => 'https://', :status => :moved_permanently}
        redirect_options.merge!(:host => host) if host
        redirect_options.merge!(:params => request.query_parameters)
        redirect_to redirect_options
      end
    end
  end

  force_ssl
  
  private
    def set_locale
      I18n.locale = params[:locale] if params[:locale].present?
    end
    def default_url_options(options = {})
      {locale: I18n.locale}
    end
end
