
$('#Drive').live('pagebeforeshow',function(event){
	drive();
	//currentSpeed();
	
	$.ajax({
		url: "motionControlPage/rudderAndSpeed",
		type: "GET",
		//context: document.body,
		dataType: "json",
		success: function(result){
			alert(result['motor']['value']);
		}
	});
	
});

$('#Waypoints').live('pagebeforeshow',function(event){

	
});
	

/*$('#LightControl').live('pageshow',function(event){
	
	
});
/*	 $("#Nav-Lights-Slider").bind('change', function(event) {
		 
		 var mySwitch = $("select#Nav-Lights-Slider");
		 if (mySwitch[0].selectedIndex = 1){
			 $.getJSON("http://localhost:8182/lighting/navigationLights/false");
		 } else {
			 $.getJSON("http://localhost:8182/lighting/navigationLights/true");
		 }
			 
		 });
}); */

function showHighLight(elementID) {
	document.getElementById(elementID).style.display = "block";	
} 
function removeHighLight(elementID){
	$('#' + elementID).hide();	

}





