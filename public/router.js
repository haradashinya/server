define(["zepto","underscore","backbone","drink_collection","drink_collection_view","lib/text!templates/popup.html","header_view","summary_view"],
	function($,_,Backbone,DrinkCollection,DrinkCollectionView,popupTemplate,HeaderView,SummaryView){
		var drinks = new DrinkCollection();
    var summaryView;




		var Router = Backbone.Router.extend({
			routes: {
				"users/:uuid/drinks/edit": "editDrink",
				"users/:uuid/drinks/summary":"showSummary",
				"users/:uuid/drinks/summary/month":"showSummaryMonth"
			},

			editDrink:function(uuid){
				window.uuid = uuid;
				window.drinkCollectionView = new DrinkCollectionView({collection: drinks});
				$("#content").html(window.drinkCollectionView.$el);

			},
			showSummary:function(uuid){
				window.uuid = uuid;
				summaryView = new SummaryView({collection: drinks});
        // renderList is callback
        // 一回fetchしたら、データをどこかに格納しておこう。
        // if complete fetch data once, then save data in summaryView's instance.
        summaryView.fetchDrinks("renderList");
				$("#content").html(summaryView.el);
			},
			showSummaryMonth: function(uuid,all){
        // for debug
        window.uuid = uuid;
        console.log(Array.isArray(drinks));
        //if  summaryView instance does not exist, then create new instance.
        if(!summaryView)  summaryView = new SummaryView({collection: drinks});

        summaryView.fetchDrinks("renderMonth","month");
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
