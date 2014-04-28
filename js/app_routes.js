(function () {
    App.IndexRoute = Ember.Route.extend({
        model: function () {
            return App.SportsList.all();
        }
    });
	
	App.Router.map(function(match) {
		this.resource('index', { path: '/' }, function() {
			this.resource('detailed', { path: ':detailed_id' });
		});  
	});
	
	App.DetailedRoute = Ember.Route.extend({
		model: function(params) {
			return App.SportsList.unique(params.detailed_id);
		}
	});
})();