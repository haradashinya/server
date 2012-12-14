define(["zepto","underscore","backbone","drink_collection","drink_collection_view","lib/text!templates/popup.html","header_view","summary_view"],
	function($,_,Backbone,DrinkCollection,DrinkCollectionView,popupTemplate,HeaderView,SummaryView){
		var drinks = new DrinkCollection();



		var Router = Backbone.Router.extend({
			routes: {
				"users/:uuid/drinks/edit": "editDrink",
				"users/:uuid/drinks/summary":"showSummary",
				"users/:uuid/drinks/summary/month":"showSummaryAll"
			},

			editDrink:function(uuid){
				window.uuid = uuid;
				window.drinkCollectionView = new DrinkCollectionView({collection: drinks});
				$("#content").html(window.drinkCollectionView.$el);

			},
			showSummary:function(uuid){
				window.uuid = uuid;
				var summaryView = new SummaryView({collection: drinks});
        // renderList is callback
        summaryView.fetchDrinks("renderList");
				$("#content").html(summaryView.el);
			},
			showSummaryAll: function(uuid,all){
        // for debug
        window.uuid = uuid;
        console.log(Array.isArray(drinks));
				var summaryView = new SummaryView({collection: drinks});
        summaryView.fetchDrinks("renderMonth");
				$("#content").html(summaryView.el);

			}
		});

		var router = new Router();
		window.refresh = function(){
			window.drinkCollectionView.collection.fetch({
				success:function(data){
					window.drinkCollectionView.trigger("addData",data);
				}
			});

		};


		Backbone.history.start();



		return Router;

});

window.refresh = function(instance){
	drinks.fetch();
};
