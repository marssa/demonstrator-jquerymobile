function drive(){

	showgauge();
	$("#move-forward").live('tap', function(event) {
		//TODO Replace by web service call
		
	});

	$("#move-backward").live('click', function(event) {
		//TODO Replace by web service call
//		 setGaugeValue(10);
		//alert("back"); 
		//gauge.needle.setValue(10);
		
		alert("back"); 
	});

	$("#turn-starboard").live('click', function(event) {
		//TODO Replace by web service call
	   	alert("Boat turns on start-board"); 
	});

	$("#turn-portside").live('click', function(event) {
		//TODO Replace by web service call
	   	alert("Boat turns on port-side"); 
	});
}