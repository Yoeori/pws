class Api::UsersController < ApiController

  def index
    @users = User.all
    if(params[:name])
      @users = @users.where("username LIKE ?" , "%#{params[:name]}%")
    end
  end

  def create
    @user = User.create(pubkey: params[:key], username: params[:name])
    @token = Token.create(user: @user)
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @updated = false
    if(@authorized)
      @auth_user.username = params[:name]
      @auth_user.save
      @updated = true
    end
  end

  def destroy
    @destroyed = false
    if(@authorized)
      @auth_user.destroy
      @destroyed = true
    end
  end

end
