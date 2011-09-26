function drive(){
	$("#move-forward").live('click', function(event) {
		//var moveID = getElementById(full-throttle-highlight);
		
		showHighLight('full-throttle-highlight');
		$.getJSON("http://localhost:8182/motor/speed/increase");
	});

	$("#move-backward").live('tap', function(event) {
		$.getJSON("http://localhost:8182/motor/speed/decrease");
	});

	$("#turn-starboard").live('click', function(event) {
		$.getJSON("http://localhost:8182/rudder/rotate/true");
	});

	$("#turn-portside").live('click', function(event) {
		$.getJSON("http://localhost:8182/rudder/rotate/false");
	});
	
	$("#stop-button").live('click', function(event) {		
		$.getJSON("http://localhost:8182/motor/speed/0");
	});
	
	$("#full-astern").live('click', function(event) {		
		$.getJSON("http://localhost:8182/motor/speed/-100");		
	});
	
	$("#full-ahead").live('click', function(event) {		
		$.getJSON("http://localhost:8182/motor/speed/100");		
	});
}



