define(["zepto","underscore","backbone","lib/text!templates/summary.html"],function($,_,Backbone,template){
	var SummaryView = Backbone.View.extend({
			initialize:function(){
				this.renderInit();
//				this.fetchDrinks("renderList");
			},
			types: ["drip_coffee","cafe_late"],
		  // create base template
			renderInit:function(){
				var tmp = _.template(template);
				this.$el.html(tmp);
				return this;
			},
		/**
		 *
		 * @param word
		 * @return {capitalized word}
		 */
			formatType:function(word){
				var sum = "";
				var capitalize = function(w){
					var res = "";
					for(var i = 0 ; i < w.length;i++){
						if (i === 0){
							res += w[i].toUpperCase();
						}else{
							res += w[i];
						}
					}
					return res + " ";
				};
				var words = word.split("_");
				words.forEach(function(w){
					sum += capitalize(w);
				},this);
				return sum;
			},
		// show each typeMap {drinkType: count}
			renderList:function(data){
        // cached data
				document.location = "app://showIndicator";
				//add for debug
				var dom = "";
				var cnt = 0;
				if (data.length === 0){
					dom += "<li>hello world</li>";
				}else{
				var sortedData = _.sortBy(data,function(item){
					return item.count * -1;
				});

				sortedData.forEach(function(item){
					cnt += 1;
					var className = "drink-count"+cnt;
					var tmp = _.template("<li class='summary-li'><%= type %><div class=<%= className %> ><%= count %></div></div>",{
						type: this.formatType(item.type),
						count: item.count,
						className: className
					});

					dom += tmp;
				},this);
				}

				document.location = "app://hideIndicator";
				this.$el.find("#summary-list").html(dom);
				return this;
			},
		renderAll:function(data){
			return this;
		},
    // data : received collection
    renderMonth:function(data){
      var dom = "";
      var cnt = 0;
      var sortedData = _.sortBy(data,function(item){
        return item.count * -1;
      });

      sortedData.forEach(function(item){
        cnt += 1;
        var className = "drink-count"+cnt;
        var tmp = _.template("<li class='summary-li'><%= type %><div class=<%= className %> ><%= count %></div></div>",{
          type: this.formatType(item.type),
          count: item.count,
          className: className
        });
        dom += tmp;
      },this);
      this.$el.html(dom);
      return this;
    },

    // opts {month: true}
		fetchDrinks:function(callback,opts){
			var self = this;
      var typeMap;
      // if set month flag true, then typeMap set only this month's data
      if (opts === "month"){
        console.log(this);
        typeMap = this.collection.incCountByType(opts);
      }else{
        typeMap = this.collection.incCountByType();
      }
			self.res = [];
			var injectItem = function(typeMap){
				Object.keys(typeMap).forEach(function(item){
					self.res.push({type: item,count:typeMap[item]});
				},this);
			};
      if (self.cachedData){
        self[callback](self.res);
      }else{
        this.collection.fetch({
          success:function(data){
            self.cachedData = data;
            var typeMap = self.collection.incCountByType();
            injectItem(typeMap);
            self[callback](self.res);
          },
          error:function(msg){
            document.location = "app://hideIndicator";
            self.$el.html("<h1 class='warning'>There's no drinks</h1>");
            self.$el.css("text-align",'center');
            self.$el.css("margin-top","150px");
          }

			});

      }


		}


	});


	return SummaryView;
});
