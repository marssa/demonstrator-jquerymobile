$('#Drive').live('pagebeforeshow',function(event){
	drive();
	
	setInterval(function() {
		$.ajax({
			async: true,
			url: "motionControlPage/rudderAndSpeed",
			type: "GET",
			dataType: "json",
			success: function(result){
				$('#percent-thrust').val(result['motor']['value']);	
				$('#rudder-angle').val(result['rudder']['value']);	
			}
		});
	}, 500);
});

$('#Waypoints').live('pagebeforeshow',function(event){
	
});
	
function showHighLight(elementID) {
	document.getElementById(elementID).style.display = "block";	
} 
function removeHighLight(elementID){
	$('#' + elementID).hide();	
}





