class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user

  private
  
  def current_user
    if session[:user_id]
      @user = User.find(session[:user_id])
    end
  end

  def logged_in?
    # Coerces return value into a Boolean
    !!current_user
  end

  def login(user)
    session[:user_id] = @user.id
  end

  def logout
    session[:user_id] = nil
  end

  def authorized
    render json: ["Unauthorized"], status: :unauthorized unless logged_in?
  end
end
