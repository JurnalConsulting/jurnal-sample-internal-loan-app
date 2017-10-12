class HealthCheckController < ApplicationController
  def index
    render :text => "I am alive!\n"
  end

  def allow_http?
    true
  end
end