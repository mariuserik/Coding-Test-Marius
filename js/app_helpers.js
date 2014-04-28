(function () {
	
	Ember.Handlebars.helper('date', function(value, options) {
	if (moment(value) != null)
	{
	return new Handlebars.SafeString(moment(value).format("DD.MM.YYYY, HH.mm"));
	}
	return "";
});

Ember.Handlebars.helper('substringHelper', function(value) {
	if (value != null){
		var valueStr = value.toString();
		return valueStr.substring(1,6);
	}else
	{
		return "Not applicable";
	}

});

    App.Trace = Ember.View.extend({
        didInsertElement: function () {
            var container = $('#googleTrace')[0];
            $(container).css({ height: '220px', width: '50%' });
            var encodedTrace = this.get('value');
            if (encodedTrace == null) 
				return;
            var decodedTrace = google.maps.geometry.encoding.decodePath(encodedTrace);
            var center = new google.maps.LatLng(0, 0);

            var options = {
                center: center,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var trace = new google.maps.Polyline({
                path: decodedTrace
            });

            var map = new google.maps.Map(container, options);

            var bounds = new google.maps.LatLngBounds();
            trace.getPath().forEach(function (LatLng) {
                bounds.extend(LatLng);
            });
            map.fitBounds(bounds);
            trace.setMap(map);
        }
    });
})();