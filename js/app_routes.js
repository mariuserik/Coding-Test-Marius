(function () {
    App.IndexRoute = Ember.Route.extend({
        model: function () {

        }
    });
	
	App.Router.map(function(match) {
		this.resource('index', { path: '/' }, function() {
			this.resource('detailed', { path: ':detailed_id' });
		});  
	});
	
	App.DetailedRoute = Ember.Route.extend({
		model: function(params) {

		}
	});
})();