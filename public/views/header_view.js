define(["zepto","underscore","backbone"],function($,_,Backbone){
	var HeaderView = Backbone.View.extend({
			initialize:function(){
			},
			render:function(){
				this.$el.html("<header class='bar-title'>this is a title</header>");
				return this;
			}
	});


	return HeaderView;
});
