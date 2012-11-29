class Drink
	include Mongoid::Document
	include Mongoid::Timestamps
	belongs_to :user
	before_destroy :send_destroy_message

	field :price , :type => Float
	field :type



	def send_destroy_message
		puts "destroy drink"
	end

end

