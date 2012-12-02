$:.unshift(File.expand_path("./lib",ENV["rvm_path"]))
require "rvm/capistrano"
require "bundler/capisrano"


set :application, "server"


set :user , "ec2-user"
set :group,user
set :runner,user
set :user_sudo,true

set :scm,:git
set :repository, "git@github.com:okamurayasuyuki/server.git"
set :branch , "master"
set :git_shallow_clone , 1

role :web,domain
role :app,domain
role :db, domain, :primary => true

set :deploy_via, :remote_cache
set :deploy_to , "/var/www/html/server/"
set :unicorn_conf, "#{deploy_to}/unicorn.rb"
set :unicorn_pid, "#{deploy_to}/unicorn.pid"



namespace :deploy do
	task :start do ; end
	task :stop do ; end

	task :restart, :roles => :app do

	end
end

