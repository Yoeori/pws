class Api::MessagesController < ApiController

  # send a new message to a certain user
  def create
    if(@authorized)
      receiving_user = User.find(params[:user_id])
      @message = Message.create(sender: @auth_user, receiver: receiving_user, message: params[:message])
    end
  end

  # receive latest messeges (and destroy them from the database)
  def show
    if(@authorized)
      @messages = @auth_user.received_messages.all;
    end
  end

end
