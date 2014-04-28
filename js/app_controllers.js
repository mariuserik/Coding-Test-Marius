(function () {
    App.SportsList = Ember.Object.extend({});
    App.Parameters = Ember.Object.extend({});

    App.SportsList.reopenClass({
        allPages: 0,
		itens: [],
        pagination: [],
        
        all: function () {
            var data = {
                page: App.Parameters.page,
				sort_by: App.Parameters.sortBy,
                order: App.Parameters.order
                
            };

            return $.getJSON('http://intense-bastion-3210.herokuapp.com/run_sessions.json', data)
			.then(function(resp) {
				var pages = [];
                var itens = resp.run_sessions;
                var pagination = resp.meta.pagination;
                var pageNumber = App.Parameters.page;
                var firstPage = pageNumber - 3;
                var lastPage = pageNumber + 3;
                App.SportsList.itens.clear();
                App.SportsList.pagination.clear();
				
                if (firstPage <= 0) {
                    firstPage = 1;
                    lastPage += 1;
                }
                if (lastPage > pagination.available_pages) {
                    lastPage = pagination.available_pages -1;
                }
                for (i = firstPage; i <= lastPage; i++) {
                    pages.push({
                        number: i,
                        isActive: (i === pageNumber) ? true : false
                    });
                }

                App.SportsList.itens.pushObjects(itens);
                App.SportsList.pagination.pushObjects(pages);
                App.SportsList.totalPages = pagination.available_pages;

                return App.SportsList;
            });
        },
        unique: function (id) {
	
		var toReturn;
	
            var itens = App.SportsList.itens;

            if (itens.length == 0) {
                return $.getJSON('http://intense-bastion-3210.herokuapp.com/run_sessions/' + id + '.json')
				.then(function (resp) {
                    return resp.run_session;
                });
            } else {
			
			$.each(itens, function( i, l ){
			  if (l.id == id)
			  {
				toReturn = l; 
			  }
			});
            }
			
			return toReturn;
        }
    });
	
    App.Parameters.reopenClass({
        page: 1,
		sortBy: 'start_time',
        order: 'desc'
    })

    App.IndexController = Ember.Controller.extend({
        actions: {
			firstPage: function (page) {
                if (App.Parameters.page > 1) {
                    App.Parameters.page = 1;
                    App.SportsList.all();
                }
            },
			back: function () {
                if (App.Parameters.page > 1) {
                    App.Parameters.page--;
                    App.SportsList.all();
                }
            },
            gotoPage: function (page) {
                App.Parameters.page = page;
                App.SportsList.all();
            },
            next: function () {
                if (App.Parameters.page < App.SportsList.totalPages) {
                    App.Parameters.page++;
                    App.SportsList.all();
                }
            },
            lastPage: function (page) {
                if (App.Parameters.page < App.SportsList.totalPages) {
                    App.Parameters.page = App.SportsList.totalPages;
                    App.SportsList.all();
                }
            },
            sortColumn: function (column) {
                var order;
                var inverse;

				if (column == App.Parameters.sortBy)
				{
					inverse = true;
				}else{
					inverse = false;
				}
                if (inverse) {
                    if (App.Parameters.order == 'asc') 
						order = 'desc';
                    else 
						order = 'asc';
                }else{
                    order = 'asc';
                }

                App.Parameters.sortBy = column;
                App.Parameters.order = order;
                App.SportsList.all();
            }     
        }
    });
})();