class Api::V1::SessionsController < ApplicationController

  # Login action
  def create
    email = params[:email] || params["email"]
    password = params[:password] || params["password"]

    @user = User.find_by(email: email)
    if @user && @user.authenticate(password)
      login(@user)
      render "api/v1/users/current_user"
    else
      render json: ["Invalid email/password"], status: :unauthorized
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
