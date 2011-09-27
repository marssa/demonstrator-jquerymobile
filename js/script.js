
/*$(document).live("mobileinit", function(){
     $.mobile.pushStateEnabled = false;
});
*/




$('#Drive').live('pageshow',function(event){
	
	drive();
	showGauge();
//	rudderAngleIndicator();
	
});



$('#LightControl').live('pageshow',function(event){


//TODO - refresh methods on checkboxes, sliders and radio buttons not working.

	

});

function showHighLight(elementID) {
	document.getElementById(elementID).style.display = "block";	
} 
function removeHighLight(elementID){
//	document.getElementById(elementID).style.display = "none";
	$('#' + elementID).hide();	

}





