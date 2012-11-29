class User
	include Mongoid::Document
	include Mongoid::Timestamps

	field :uuid
	has_many :drinks, dependent: :delete


	def total_price
		sum = 0
		self.drinks.map{|drink| sum += drink.price.to_f}
		sum =  '%.4g' % sum
		return sum.to_f
	end

	def current_rank
		selected_user = User.find_by({:uuid => self.uuid})
		sorted_users = User.all.sort_by{|user| user.total_price }.reverse!

		index = 0
		for user in sorted_users
			if selected_user.uuid == user.uuid
				return index + 1
			else
				index += 1
			end
		end
	end


	# override instance method for class method
	def self.current_rank(uuid)
		selected_user = User.find_by({:uuid => uuid})
		selected_user.current_rank
	end




end
