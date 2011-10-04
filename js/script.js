
$('#Drive').live('pageshow',function(event){
	drive();
});



$('#LightControl').live('pageshow',function(event){
	 $("#Nav-Lights-Slider").bind('change', function(event) {
		 
		 var mySwitch = $("select#Nav-Lights-Slider");
		 if (mySwitch[0].selectedIndex = 1){
			 $.getJSON("http://localhost:8182/lighting/navigationLights/false");
		 } else {
			 $.getJSON("http://localhost:8182/lighting/navigationLights/true");
		 }
			 
		 });
});

function showHighLight(elementID) {
	document.getElementById(elementID).style.display = "block";	
} 
function removeHighLight(elementID){
	$('#' + elementID).hide();	

}





