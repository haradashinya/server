require "rubygems"
require "mongoid"
require "sinatra/base"
require "sinatra"
require "json"
require "retryable"
require File.join(File.dirname(__FILE__),"models","user")
require File.join(File.dirname(__FILE__),"models","drink")
require "mongo"
require "pry"

UUID = ""



# save uuid
class Helper
		attr_accessor :uuid
end


helper = Helper.new

class App < Sinatra::Base
	configure  do 
		set :clean_trace, true
		Dir.mkdir("logs") unless File.exist?("logs")
		$logger = Logger.new("logs/common.log","weekly")
		$logger.level = Logger::WARN
		$stdout.reopen("logs/output.log","w")
		$stdout.sync = true
		$stdout.reopen($stdout)
	end

	enable :logging, :dump_errors, :raise_errors

Mongoid.configure do |config|
		config.connect_to("db_test")
end

post "/deploy" do
	`echo  #{params[:payload]}`
	$stdout.puts JSON.parse(params[:payload])
	`echo "hello world"`
	`cd /var/www/html/server`
	`git pull origin master`
end




get "/" do
	p "hello world"
	File.read(File.join("public","index.html"))
end


post "/users/" do
	helper.uuid = params[:uuid]
	user = User.find_or_create_by(:uuid => helper.uuid)
	return user
end

get "/hello" do
return "hello"
end

get "/users/:uuid/drinks/total_price/" do
	content_type :json
	user = User.find_or_create_by(:uuid => params[:uuid])
	if user.respond_to? :total_price
		return {:total => user.total_price}.to_json
	else
		return {:total => 0.0}.to_json
	end
end


get "/users/:uuid/rank/" do
	content_type :json
	uuid = params[:uuid]
	return {:rank => User.current_rank(uuid),:total => User.all.count}.to_json
end

get "/users/:uuid/drinks/" do
	content_type :json
	retryable(:tries => 3 , :on => [Errno::ECONNRESET,TimeoutError]) do
		user = User.find_by({:uuid => params[:uuid].to_s})
		if user.drinks.count == 0
			error 404
		else
			return user.drinks.reverse.to_json
		end
	end
end

delete "/users/:uuid/drinks/:drink_id" do
	user = User.find_by({:uuid => params[:uuid].to_s})
	drink = user.drinks.find_by({:_id => params[:drink_id]})
	drink.destroy
end


put "/users/:uuid/drinks/:drink_id" do
	item  = JSON.parse(request.body.read)
	user = User.find_by({:uuid => params[:uuid].to_s})
	drink = user.drinks.find_by({:_id => params[:drink_id]})
	drink.update_attributes({:price => item["price"].to_i,:type => "nobi"})
end

post "/users/:uuid/drinks/" do
	retryable(:tries => 3, :on => [Errno::ECONNRESET,TimeoutError]) do
		price = params[:price].to_f
		puts params[:time]
		p "hello woororororororororoororrororororoorroroororororooro"
		type = params[:type].downcase.split(" ").join("_")
		user = User.find_or_create_by(:uuid => params[:uuid])
		user.drinks.create({:type => type,:price => price,:created_at => Time.now,:local_time => params[:date]})
	end
end











end

