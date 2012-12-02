
set :application, "server"
set :repository,  "/var/www/html/server"
set :local_repository, "Users/haradashinya/project/server"

set :git

role :web,"http://54.248.226.131:3000/"
role :app,"http://54.248.226.131:3000/"
role :db,"http://54.248.226.131:3000/"

after "deploy:restart", "deploy:cleanup"

 namespace :deploy do
   task :start do ; end
   task :stop do ; end
   task :restart, :roles => :app, :except => { :no_release => true } do
     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
   end
 end
