function drive(){
	
	var t;
	
	$("#move-forward").live('tap', function(event) {
	//	removeHighLight('##');
	//	showHighLight('##');
		$.getJSON("http://localhost:8182/motor/speed/increase");
		t = setInterval("increaseSpeed()",500);
		
	});
	
	$("#move-forward").live('mouseup', function(event) {
		clearInterval(t);
		//removeHighLight('##');
		//showHighLight('##');
		
	});
	
	$("#move-backward").live('taphold', function(event) {
		$.getJSON("http://localhost:8182/motor/speed/decrease");
		removeHighLight('down-button');
		showHighLight('down-button-hl');
		t = setInterval("decreaseSpeed()",500);
	});	
	
	
	$("#move-backward").live('mouseup', function(event) {
		clearInterval(t);
		removeHighLight('down-button-hl');
		showHighLight('down-button');
		
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
		removeHighLight('full-throttle');
		showHighLight('full-throttle-highlight');
		
		
		$.getJSON("http://localhost:8182/motor/speed/100");		
	});
	
	$("#full-ahead").live('mouseup', function(event) {
		
		showHighLight('full-throttle-highlight');
		removeHighLight('full-throttle');
	});
	
}


function decreaseSpeed(){
	$.getJSON("http://localhost:8182/motor/speed/decrease");
}

function increaseSpeed(){
	$.getJSON("http://localhost:8182/motor/speed/increase");
}
