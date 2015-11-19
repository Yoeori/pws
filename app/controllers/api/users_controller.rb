class Api::UsersController < ApiController

  def index
    @users = User.all
    if(params[:name].downcase)
      @users = @users.where("username LIKE ?" , "%#{params[:name].downcase}%")
    end
  end

  def create
    @created = false
    unless(User.where(username: params[:name].downcase).first)
      @user = User.create(pubkey: params[:key], username: params[:name].downcase)
      @token = Token.create(user: @user)
      @created = true
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @updated = false
    if(@authorized)
      @auth_user.username = params[:name].downcase
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
