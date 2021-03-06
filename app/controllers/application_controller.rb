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

  def render_forbidden
    render json: ["Forbidden"], status: :forbidden
  end

  def render_not_found
    render json: ["Not Found"], status: :not_found
  end

  def render_duplicate
    render json: ["Duplicate record"], status: :unprocessable_entity
  end

  # Set an @pages hash using Kaminari that can be rendered in JBuilder
  # partial: utilities/_page_counts.json.jbuilder
  def set_pages(collection)
    @pages = {
      current_page: collection.current_page,
      total_pages: collection.total_pages
    }
  end
end
