define(["zepto","underscore","backbone"],function($,_,Backbone){
	var Drink = Backbone.Model.extend({
		initialize:function(){
			_.bindAll(this,"removeDrink");
			this.on("destroy",this.removeDrink,this);
			this.on("update",this.updateDrink,this);
		},
		removeDrink:function(){
			var model = this.toJSON();
			$.ajax({
				type:"DELETE",
        url:window.baseURL +"/users/" + window.uuid + "/drinks/" + model._id,
				success:function(data){
					console.log("removed drinks successfully");

				}
			})
		},
		updateDrink:function(){
			var model = this.toJSON();
			$.ajax({
				type: "PUT",
        url:window.baseURL +"/users/" + window.uuid + "/drinks/" + model._id,
				data: JSON.stringify(model),
				success:function(data){
					console.log("success update");

				}
			})
		}
	});



	return Drink;
});
