define(["zepto","underscore","backbone","drink","const"],
	function($,_,Backbone,Drink){
		var DrinkCollection = Backbone.Collection.extend({
			url:function(){

        return window.baseURL + "/users/" + window.uuid + "/drinks/";

			},
			initialize:function(uuid){
                  console.log(window.baseURL);
			},
      // opts {month: true}
			incCountByType:function(opts){
        var drinks;
        if(opts === "month"){
          drinks = this.drinksByFilteredThisMonth();
        }else{
          drinks = this.toJSON();
        }

        drinks = this.toJSON();
				var typeMap = {};

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
