require "rubygems"
require "pry"
require "mongoid"
require "sinatra/base"
require "sinatra"
require "json"
require "retryable"
require File.join(File.dirname(__FILE__),"models","user")
require File.join(File.dirname(__FILE__),"models","drink")
require "mongo"

UUID = ""



# save uuid
class Helper
		attr_accessor :uuid
end


helper = Helper.new

class App < Sinatra::Base
  set :port , 80
  use Rack::Logger




Mongoid.configure do |config|
	if ENV["MONGOHQ_URL"] 
		uri  = URI.parse(ENV['MONGOHQ_URL'])
		conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
		config.master = conn.db(uri.path.gsub(/^\//, ''))
	else
		config.connect_to("db_test")
	end
end

get "/" do
	File.read(File.join("public","index.html"))
end




post "/users/" do
	helper.uuid = params[:uuid]
	user = User.find_or_create_by(:uuid => helper.uuid)
	return user
end


get "/users/:uuid/drinks/total_price/" do
	content_type :json
	user = User.find_or_create_by(:uuid => params[:uuid])
	return {:total => user.total_price}.to_json
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
		type = params[:type].downcase.split(" ").join("_")
		user = User.find_or_create_by(:uuid => params[:uuid])
		user.drinks.create({:type => type,:price => price})
	end
end











end

