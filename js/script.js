$('#Drive').live('pagebeforeshow',function(event){
	drive();
	
	$.ajax({
		url: "motionControlPage/rudderAndSpeed",
		type: "GET",
		//context: document.body,
		dataType: "json",
		success: function(result){
			$('#percent-thrust').val(result['motor']['value']);		}
	});
	
});

$('#Waypoints').live('pagebeforeshow',function(event){

	
});
	
function showHighLight(elementID) {
	document.getElementById(elementID).style.display = "block";	
} 
function removeHighLight(elementID){
	$('#' + elementID).hide();	

}





