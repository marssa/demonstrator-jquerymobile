
$('#Drive').live('pageshow',function(event){
	
	drive();
});



$('#LightControl').live('pageshow',function(event){


//TODO - refresh methods on checkboxes, sliders and radio buttons not working.

	

});

function showHighLight(elementID) {
	document.getElementById(elementID).style.display = "block";	
} 
function removeHighLight(elementID){
	$('#' + elementID).hide();	

}





