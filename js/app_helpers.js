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

})();