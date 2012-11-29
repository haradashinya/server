define(["zepto","underscore","backbone","lib/text!templates/drink_view.html","lib/text!templates/popup.html"],
	function($,_,Backbone,template,popupTemplate){
		var DrinkView = Backbone.View.extend({
			tagName: "li",
			initialize:function(){
				_.bindAll(this,"removeDrink","updateDrink","render");
				this.model.bind("change",this.changed,this);
			},
			events: {
				"click li .remove-drink": "removeDrink",
				"click .update-drink": "updateDrink"
			},
			render:function(){
				var className = "drink-li-"+this.model.get("type").split("_")[0];
				var opts = {
					uuid: window.uuid,
					type: this.formatTitle(this.model.get("type")),
					_id: this.model.get("_id"),
					user_id: this.model.get("user_id"),
					price: this.model.get("price"),
					date: this.formatDate(this.model.get("created_at")),
					className: className
				};

				var compiledTemplate = _.template(template,opts);
				this.$el.html(compiledTemplate);
				this.$el.addClass(className);

				return this;
			},
			formatDate:function(date){
				var d = date.split("T");
				var time = d[1].slice(0,5);
				return d[0] + " " + time;
			},
			// ugly implement...
			formatTitle:function(str){
				var splittedWords = str.split("_");
				var capitalize = function(word){
					var first = word[0];
					var rest = word.slice(1,word.length);
					return first.toUpperCase() + rest;
				};

				if (splittedWords.length === 1){
					return capitalize(splittedWords[0]);
				}

				var firstWord = splittedWords[0];
				var first = capitalize(firstWord);

				var secondWord = splittedWords[1];
				var second = capitalize(secondWord);

				var res = first + " " + second;

				return res;
			},
			removeDrink:function(){
				this.$el.remove();
				this.model.destroy();
			},
			updateDrink:function(){
				this.model.set({type: "nobi"});
				this.model.trigger("update");
			},
			changed:function(){
				this.render();
			}

		});



		return DrinkView;
	});
