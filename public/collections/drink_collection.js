define(["zepto","underscore","backbone","drink"],
	function($,_,Backbone,Drink){
		var DrinkCollection = Backbone.Collection.extend({
			url:function(){
				return "http://54.248.226.131:3000/users/" + window.uuid + "/drinks/";
			},
			initialize:function(uuid){
			},
			incCountByType:function(){
				var typeMap = {};
				var drinks = this.drinksByFilteredThisMonth();
				// if type is undefined , then inclement count
				drinks.forEach(function(drink){
					if (typeMap[drink.type] !== undefined){
						typeMap[drink.type] += 1;
					}else{
						typeMap[drink.type] = 1;
					}
				},this);
				return typeMap;
			},
			drinkAll:function(){
				return this.toJSON();
			},
			drinksByFilteredThisMonth:function(){
				var current = this.currentInfo();
				var items = this.toJSON();
				var filterdArr = items.filter(function(item){
					var year = parseInt(item.created_at.split("-")[0],10);
					var month = parseInt(item.created_at.split("-")[1],10);
					return current.year === year && current.month === month;
				},this);
				return filterdArr;
			},
			// month currentInfo.month
			// year currentInfo.year
			currentInfo:function(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				return {year:year,month:month};
			}

		});

		return DrinkCollection;
	});
