$('#NavDisplay').live("pageshow", function() {
	//Replaced by co-ordinates retrieved from the GPS sensors
	
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			initialize(position.coords.latitude,position.coords.longitude);
		});
	}
});

function initialize(lat,lng) {
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 8,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    
    var marker = new google.maps.Marker({
    	position: latlng,
    	map: map,
    	animation: google.maps.Animation.DROP
   	});
    
    var contentString1 = '<div id="content"><div id="siteNotice"><p class="info_box"></p><p>The DemonStrator is here!</p><a href="www.marssa.org">www.marssa.org</a></div></div>';

    var infowindow1 = new google.maps.InfoWindow({
    content: contentString1,
    maxWidth: 200
    });

    google.maps.event.addListener(marker, 'click', function() {
    infowindow1.open(map,marker);
    });

}