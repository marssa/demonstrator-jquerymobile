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
    
    infoWindow = new google.maps.InfoWindow();
    
    //Marker's  tag
/*    var contentString1 = '<div id="content"><div id="siteNotice"><p class="info_box"></p><p>The DemonStrator is here!</p><a href="www.marssa.org">www.marssa.org</a></div> </div>';

    var infowindow1 = new google.maps.InfoWindow({
    content: contentString1,
    maxWidth: 200
    });

    google.maps.event.addListener(marker, 'click', function() {
    	infowindow1.open(map,marker);
    });*/
    
    //Listener to click on map to add marker in that position    
    google.maps.event.addListener(map, 'click', function(event) {
    	placeMarker(event.latLng);
      });
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






