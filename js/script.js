

$("#move-forward").live('tap', function(event) {
	//TODO Replace by web service call
	alert("Boat moving forward");
});

$("#move-backward").live('tap', function(event) {
	//TODO Replace by web service call
   	alert("Boat moving backward"); 
});

$("#turn-starboard").live('tap', function(event) {
	//TODO Replace by web service call
   	alert("Boat turns on start-board"); 
});

$("#turn-portside").live('tap', function(event) {
	//TODO Replace by web service call
   	alert("Boat turns on port-side"); 
});

$('#Drive').live('pageshow',function(event){
	$(function() {
    $( "#vertical-slider" ).slider({
            orientation: "vertical",
            range: "min",
            min: -100,
            max: 100,
            value: 0,
            
              });
});
	
});





