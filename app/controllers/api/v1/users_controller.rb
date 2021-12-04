class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authorize_ownership, only: :update

  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1.json
  def show
  end

  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show, status: :created, location: api_v1_user_url(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render :show, status: :ok, location: api_v1_user_url(@user)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1.json
  def destroy
    @user.destroy
    head :no_content
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Make sure the currently logged in user can only update their own account.
  def authorize_ownership
    if @user != current_user
      render json: ["unauthorized"], status: :forbidden
      return # Guard clause
    end
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:username, :email, :bio, :password, :password_confirmation)
  end
end
