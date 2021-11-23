class Api::V1::SessionsController < ApplicationController

  # Login action
  def create
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      login(@user)
      render "api/v1/users/show"
    else
      render json: ["Invalid username/password"], status: :unauthorized
    end
  end

  # Logout action
  def destroy
    @user = current_user
    if @user
      logout
      render "api/v1/users/show"
    else
      render json: ["Not signed in"], status: :not_found
    end
  end
end
