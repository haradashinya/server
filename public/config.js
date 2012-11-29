require.config({
		paths: {
			zepto: "lib/zepto.min",
			underscore: "lib/underscore-min",
			backbone: "lib/backbone-min",
			drink_collection:"collections/drink_collection",
			drink_collection_view:"views/drink_collection_view",
			summary_view:"views/summary_view",
			drink_view:"views/drink_view",
			drink:"models/drink",
			header_view:"views/header_view",
			router: "router"
		},
		shim: {
			"backbone":{
				deps:["underscore","zepto"],
				exports: "Backbone"
			},
			"underscore":{
				exports: "_"
			},
			"zepto":{
				exports: "$"
			},
			"drink_collection":{
				exports: "DrinkCollection"
			},
			"drink_collection_view":{
				exports: "DrinkCollectionView"
			},
			"summary_view":{
				exports: "SummaryView"
			},
			"drink":{
				exports:"Drink"
			},
			"drink_view":{
				exports: "DrinkView"
			},
			"header_view":{
				exports: "HeaderView"
			}
		}
});
