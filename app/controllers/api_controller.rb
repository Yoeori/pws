class ApiController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :check_authorization

  def check_authorization
    @authorized = false
    if(params[:token])
      token = Token.where(token: params[:token]).first
      puts token
      if(token)
        @authorized = true
        @auth_user = token.user
      end
    end
  end

  def index

  end

end
