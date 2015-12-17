# Profile Paper experiment: encrypted chat application
Secure Chat is an application to allow two individuals to chat with the guarantee that no one will be able to read or change their messages (end to end encryption). A live version can be found at [https://school.yoeori.nl/services/pws/](https://school.yoeori.nl/services/pws/).

I made this application as an experiment for my profile paper to test how hard it would be to create such a secure application. The profile paper is a paper that all Dutch highschool students with HAVO or VWO level have to make near the end of their school career.

Lastly I would like to mention that this application is an experiment and should NOT be used as an actual service to communicate securely (it was created in a matter of weeks.. so yeah...). Even though I have been learning about cryptography over the last few months I am in no way an expert on the subject. I would recommend Signal: an app for [Android](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms) and [iOS](https://itunes.apple.com/nl/app/signal-private-messenger/id874139669) for encrypted conversations.

## How it works
The service works with a server and clients. The server is only used to pass over encrypted messages and provide users with public keys. When the server receives an encrypted message (by the sender) this is stored untill the receiver asks the server if any new messages have arrived. This message is then decrypted locally using their own private key and stored in Javascript's LocalStorage.

Below are a some graphs in Dutch that show how the client and server communicate:
![Sending and receiving messages](https://uploads.yoeori.nl/securechatgraph_1.png)
![Adding a contact](https://uploads.yoeori.nl/securechatgraph_2.png)
![Creating a new user](https://uploads.yoeori.nl/securechatgraph_3.png)

## Running the application
Before you start make sure you have [Git](http://git-scm.com/) and [Ruby](https://www.ruby-lang.org/) 2.0 or greater installed. To get the application running fill in the following commands in linux:
```sh
$ gem install bundler
$ git clone https://github.com/Yoeori/pws.git
$ cd pws
$ bundle install
$ cp ./config/database.example.yml ./config/database.yml
$ rake db:migrate
$ rails server
```
You should now be able to connect via [http://localhost:3000](http://localhost:3000).

## Contributing
I probably won't be updating this project in the near future but contributions in the form of a pull request are always welcome. (Especially if you have refactored my code because it is a complete mess at the moment.)
