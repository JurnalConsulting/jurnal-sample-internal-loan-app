Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # devise_for :users
  devise_for :users, :controllers => { registrations: 'registrations' }  
  
  scope ":locale", locale: /#{I18n.available_locales.join("|")}/ do
    root 'page#home'
    get '/submitted_tab', :to => 'page#home', :as => 'submitted_tab'
    
    get '/sync_response', :to => 'page#sync_response', :as => 'sync_response'
    get "ping/health_check" => "health_check#index"

    resources :forms
    resources :options
  end
  get '*path', to: redirect("/#{I18n.default_locale}/%{path}/"), constraints: lambda { |req| !req.path.starts_with? "/#{I18n.default_locale}/" }
  get '', to: redirect("/#{I18n.default_locale}/")

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
