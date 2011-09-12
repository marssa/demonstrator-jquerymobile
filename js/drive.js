function drive(){
$("#move-forward").live('tap', function(event) {
		//TODO Replace by web service call
   	alert("Boat moving forward");
	//	var value = $("#thrust-slider").val();
	//	value = value + 10;
	
//		$("#thrust-slider").val($("#thrust-slider").val() + 10).slider("refresh"); 
		
	//	$("#thrust-slider").change(function(event) {
	//		$("#thrust-slider").slider("refresh");
		//		});
		
	//	$("#thrust-slider").slider("refresh");	$("#thrust-slider").change(function() {
			
	//	$("input[type=range]");
		
		
	});

	$("#move-backward").live('click', function(event) {
		//TODO Replace by web service call
	   	alert("Boat moving backward"); 
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