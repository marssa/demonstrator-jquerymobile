$('#NavDisplay').live("pageshow", function() {
	
//Replaced by co-ordinates retrieved from the GPS sensors
/*	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			initialize(position.coords.latitude,position.coords.longitude);
		});
	} 
*/
initialize(35.889013, 14.517207);
});

var map;
var infoWindow; 
var contentString = '<div data-role="fieldcontain" id="marker-form" style=" width: 200px; height: 75px"> ' +
'<label for="name">Enter name of location:</label><br/><br/>'+
'<input type="text" id="textbox" name="wp-name" value=""  />' +
' <input type="submit" value="Add" id="submit-button" />'+
'</div>';

function initialize(lat,lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 18,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    
    var marker = new google.maps.Marker({
    	position: latlng,
    	map: map,
    	animation: google.maps.Animation.DROP
   	});
    
    //infoWindow pop-up to enter name of new Waypoint
    infoWindow = new google.maps.InfoWindow();
    
    //line between markers
    var polyOptions = {
    	    strokeColor: '#E0E01B',
    	    strokeOpacity: 1.0,
    	    strokeWeight: 3
    	  };
    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);
   
    //Listener to click on map to add marker in that position    
    google.maps.event.addListener(map, 'click', function(event) {
    	addLatLng(event); //for polyline
    	placeMarker(event.latLng);
      });
     
}

function addLatLng(event){
	var path = poly.getPath();
	path.push(event.latLng);
}

function placeMarker(location) {
	
	var marker1 = new google.maps.Marker({
    	      position: location, 
    	      map: map
	});
    	  
	 map.setCenter(location);
	 infoWindow.setContent(contentString);
	 infoWindow.open(map,marker1);
}

$('#submit-button').live("click", function() {
	
  	var markerName = $('#textbox').val();
  	a = $('<a/>');
 	a.text(markerName);
	infoWindow.close(); 
  	a.attr('href', '#Drive');
  	a.attr('data-transition', 'slide');
  	li = $('<li/>');
    li.append(a);
    $('#markers-list').append(li);
	$('#markers-list').listview('refresh');
	
});






