
$('#Drive').live('pageshow',function(event){
	
	drive();
	showGauge();
//	rudderAngleIndicator();
	
});



$('#LightControl').live('pageshow',function(event){


//TODO - refresh methods on checkboxes, sliders and radio buttons not working.

	

});

function showHighLight(elementID) {
	
	/*if(document.getElementById(elementID).style.display = "block"){
		$('#' + elementID).hide();  
	} else if (document.getElementById(elementID).style.display = "none"){
		$('#' + elementID).show();	
	}*/
	
	
/*	if(document.getElementById(elementID).style.display = "none"){
		$('#' + elementID).show();  
	} 
	
	if (document.getElementById(elementID).style.display = "block"){
		$('#' + elementID).show();	
	}*/
	

	
	if(document.getElementById(elementID).style.display = "block")
	{
		document.getElementById(elementID).style.display = "none";	
	} else	{
			document.getElementById(elementID).style.display = "block";
		}

} 





