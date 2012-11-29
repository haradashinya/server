define(["zepto","underscore","backbone","lib/text!templates/edit_drink.html",
				"drink_collection","drink","views/drink_view","lib/text!templates/popup.html"],
	function($,_,Backbone,template,DrinkCollection,Drink,DrinkView,popupTemplate){

		var options = {};
		var compiledTemplate = _.template(template,options);

		var DrinkCollectionView = Backbone.View.extend({
			// look for templates/edit_drink.html
			tagName: "ul",
			className:"list",
			initialize:function(){
				_.bindAll(this,"render","update","refresh");
				document.location = "app://showIndicator";
				this.collection.fetch({
					success:$.proxy(this.addView,this),
					error:$.proxy(this.showError,this)
				});
				this.render();

			},
			addView:function(collection){
				var self = this;
				collection.models.forEach(function(item){
					var drink = new Drink(item.toJSON());
					var drinkView = new DrinkView({model: drink});
					this.$el.append(drinkView.render().$el);
				},this);
				this.render();
				document.location = "app://hideIndicator";
			},
			render:function(){
				return this;
			},
			showError:function(){
				this.$el.html("<h1 class='warning'>There's no drinks</h1>");
				this.$el.css("text-align",'center');
				this.$el.css("margin-top","10px");
			},
			update:function(){
				console.log("update");
			},
			refresh:function(){
				alert("refreshed");

			}
		});

		return DrinkCollectionView;
	});
