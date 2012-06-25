var coordinatesInterrupt;
var polyLine;
var tmpPolyLine;
var markers = [];
var vmarkers = [];
var map = null;
var infoWindow = null; 
var boatMarker;
var contentString = '<div data-role="fieldcontain" id="marker-form" style=" width: 200px; height: 75px"> ' +
						'<label for="name">Enter  Waypoint Name:</label><br/><br/>'+
						'<input type="text" id="textbox" name="wp-name" value=""  />' +
						'<input type="submit" value="Add" id="submit-button" />'+
					'</div>';

var waypointsArray = [];
var id = 0;

$('#NavDisplay').live('pageshow', function() {
	
	
	initMap('map_canvas');

	boatMarker = new google.maps.Marker({
	      map: map,
	});
	coordinatesInterrupt = setInterval("trackPosition()",3000);
	initPolyline();
	
});

$('#NavDisplay').live('pagehide', function() {
	clearInterval(coordinatesInterrupt);
	coordinatesInterrupt = null;
});

function trackPosition(){
	
		$.ajax({
			  url: "gps/coordinates",
			  dataType: "json",
			  data: {},
			  async: false,
			  success: function(coordinate){
				 lat = coordinate['latitude']['DMS']['value'];
				 lng = coordinate['longitude']['DMS']['value'];
				 map.setCenter(new google.maps.LatLng(lat, lng));
				 boatMarker.setPosition(new google.maps.LatLng(lat, lng));
			  },
			  error: function(result){
				  clearInterval(coordinatesInterrupt);	
				alert(result.status);
			 }
		});
	
	
}

function initMap(mapHolder){
	markers = [];
	vmarkers = [];
	var mapOptions = {
		zoom: 18,
		center: new google.maps.LatLng(35.88923, 14.51721), 
		mapTypeId: google.maps.MapTypeId.HYBRID,
		draggableCursor: 'auto',
		draggingCursor: 'move',
		disableDoubleClickZoom: true
	};
	
	
	map = new google.maps.Map(document.getElementById(mapHolder), mapOptions);
	google.maps.event.addListener(map, "click", mapLeftClick);
	mapHolder = null;
	mapOptions = null;
	
};

google.maps.Map.prototype.clearOverlays = function() {
	  if (markers) {
	    for (var i = 0; i < markers.length; i++ ) {
	      markers[i].setMap(null);
	    }
	  }
  if (vmarkers) {
		    for (var i = 0; i < vmarkers.length; i++ ) {
		      vmarkers[i].setMap(null);
		    }
	  }
	  polyLine.setMap(null);
	  initPolyline();
	  $('#markers-input').empty();
	  $('#markers-input').listview('refresh');
	  map=null;
};

var initPolyline = function() {
	var polyOptions = {
		strokeColor: "#F0E21D",
		strokeOpacity: 0.8,
		strokeWeight: 4
	};
	var tmpPolyOptions = {
		strokeColor: "#F0E21D",
		strokeOpacity: 0.4,
		strokeWeight: 4
	};
	polyLine = new google.maps.Polyline(polyOptions);
	polyLine.setMap(map);
	tmpPolyLine = new google.maps.Polyline(tmpPolyOptions);
	tmpPolyLine.setMap(map);
};

function createInfoWindow(marker){
	
	infoWindow = new google.maps.InfoWindow();
	infoWindow.setContent(contentString);
	infoWindow.open(map,marker);
		 
	$('#submit-button').live("click", function() {
		var markerName = $('#textbox').val();
		lat = marker.getPosition().lat();
		lng = marker.getPosition().lng();
		
		waypointsArray.push({waypointID: id++, waypointName: markerName, waypointLat: lat, waypointLon: lng});
				
		h3 = '<h3>' + markerName + '</h3>';
		//split into Degrees, Minutes, Seconds
		
		latdeg = Math.floor(lat);
		latmin = Math.floor((lat % 1)* 60 );
		latsec = Math.round( ( (((lat % 1) * 60) % 1) * 60) * 100) / 100;
		
		lngdeg = Math.floor(lng);
		lngmin = Math.floor((lat % 1)* 60 );
		lngsec = Math.floor( ( (((lng % 1) * 60) % 1) * 60) * 100) / 100;
		
		latshow = "<p>Latitude: " + latdeg + "\u00B0 " + latmin + "\' " + latsec + "\" </p>";
		lngshow = "<p>Longitude: " + lngdeg + "\u00B0 " + lngmin + "\' " + lngsec + "\"</p>";
		
		infoWindow.close(); 
		
		marker.setTitle(markerName + ", Lat:" +  latdeg + "\u00B0 " + latmin + "\' " + latsec + "\"" + ", Lng:" + lngdeg + "\u00B0 " + lngmin + "\' " + lngsec + "\"");
		
		//build & add collapsible item
		div = $('<div/>');
	  	div.attr('data-role', 'collapsible');
	  	div.attr('data-theme','e');
	  	div.attr('data-content-theme', 'e');
	  	div.append(h3);
	  	div.append(latshow);
	  	div.append(lngshow);
	  	//add waypoint to list
	    $('#markers-input').append(div);
	    $('#markers-input').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});
	    infoWindow = null;
	}); 
	

}



var mapLeftClick = function(event) {
	
	if(infoWindow != null){
		infoWindow.close();
		infoWindow = null;
	}
		
	if (event.latLng) {
		var marker = createMarker(event.latLng);
		markers.push(marker);
		if (markers.length != 1) {
			var vmarker = createVMarker(event.latLng);
			vmarkers.push(vmarker);
			vmarker = null;
		}
		var path = polyLine.getPath();
		path.push(event.latLng);
		createInfoWindow(marker);		
		
		marker = null;
	}
	
	event = null;
};

var createMarker = function(point) {
	var imageNormal = new google.maps.MarkerImage(
		"img/boat-icon-normal.png",
		new google.maps.Size(11, 11),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 6)
	);
	var imageHover = new google.maps.MarkerImage(
		"img/boat-icon-fade.png",
		new google.maps.Size(11, 11),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 6)
	);
	var marker = new google.maps.Marker({
		position: point,
		map: map,
		icon: imageNormal,
		draggable: true
	});
	google.maps.event.addListener(marker, "mouseover", function() {
		marker.setIcon(imageHover);
	});
	google.maps.event.addListener(marker, "mouseout", function() {
		marker.setIcon(imageNormal);
	});
	google.maps.event.addListener(marker, "drag", function() {
		for (var m = 0; m < markers.length; m++) {
			if (markers[m] == marker) {
				polyLine.getPath().setAt(m, marker.getPosition());
				moveVMarker(m);
				break;
			}
		}
		m = null;
	});

	
	google.maps.event.addListener(marker, "dblclick", function() {
		for (var m = 0; m < markers.length; m++) {
			if (markers[m] == marker) {
				marker.setMap(null);
				markers.splice(m, 1);
				polyLine.getPath().removeAt(m);
				removeVMarkers(m);
				break;
			}
		}
		m = null;
	});
	return marker;
};

var createVMarker = function(point) {
	if(infoWindow != null){
		infoWindow.close();
		infoWindow = null;
	}
	
	var prevpoint = markers[markers.length-2].getPosition();
	var imageNormal = new google.maps.MarkerImage(
		"img/x.png",
		new google.maps.Size(11, 11),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 6)
	);
	var imageHover = new google.maps.MarkerImage(
		"img/x-hover.png",
		new google.maps.Size(11, 11),
		new google.maps.Point(0, 0),
		new google.maps.Point(6, 6)
	);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(
			point.lat() - (0.5 * (point.lat() - prevpoint.lat())),
			point.lng() - (0.5 * (point.lng() - prevpoint.lng()))
		),
		map: map,
		icon: imageNormal,
		draggable: true
	});
	google.maps.event.addListener(marker, "mouseover", function() {
		marker.setIcon(imageHover);
	});
	google.maps.event.addListener(marker, "mouseout", function() {
		marker.setIcon(imageNormal);
	});
	google.maps.event.addListener(marker, "dragstart", function() {
		for (var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				var tmpPath = tmpPolyLine.getPath();
				tmpPath.push(markers[m].getPosition());
				tmpPath.push(vmarkers[m].getPosition());
				tmpPath.push(markers[m+1].getPosition());
				break;
			}
		}
		m = null;
	});
	google.maps.event.addListener(marker, "drag", function() {
		for (var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				tmpPolyLine.getPath().setAt(1, marker.getPosition());
				break;
			}
		}
		m = null;
	});
	google.maps.event.addListener(marker, "dragend", function() {
		for (var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				var newpos = marker.getPosition();
				var startMarkerPos = markers[m].getPosition();
				var firstVPos = new google.maps.LatLng(
					newpos.lat() - (0.5 * (newpos.lat() - startMarkerPos.lat())),
					newpos.lng() - (0.5 * (newpos.lng() - startMarkerPos.lng()))
				);
				var endMarkerPos = markers[m+1].getPosition();
				var secondVPos = new google.maps.LatLng(
					newpos.lat() - (0.5 * (newpos.lat() - endMarkerPos.lat())),
					newpos.lng() - (0.5 * (newpos.lng() - endMarkerPos.lng()))
				);
				var newVMarker = createVMarker(secondVPos);
				newVMarker.setPosition(secondVPos);//apply the correct position to the vmarker
				var newMarker = createMarker(newpos);
				markers.splice(m+1, 0, newMarker);
				polyLine.getPath().insertAt(m+1, newpos);
				marker.setPosition(firstVPos);
				vmarkers.splice(m+1, 0, newVMarker);
				tmpPolyLine.getPath().removeAt(2);
				tmpPolyLine.getPath().removeAt(1);
				tmpPolyLine.getPath().removeAt(0);
				createInfoWindow(newMarker);
				newpos = null;
				startMarkerPos = null;
				firstVPos = null;
				endMarkerPos = null;
				secondVPos = null;
				newVMarker = null;
				newMarker = null;
				break;
			}
		}
	});

	return marker;
};

var moveVMarker = function(index) {
	var newpos = markers[index].getPosition();
	if (index != 0) {
		var prevpos = markers[index-1].getPosition();
		vmarkers[index-1].setPosition(new google.maps.LatLng(
			newpos.lat() - (0.5 * (newpos.lat() - prevpos.lat())),
			newpos.lng() - (0.5 * (newpos.lng() - prevpos.lng()))
		));
		prevpos = null;
	}
	if (index != markers.length - 1) {
		var nextpos = markers[index+1].getPosition();
		vmarkers[index].setPosition(new google.maps.LatLng(
			newpos.lat() - (0.5 * (newpos.lat() - nextpos.lat())), 
			newpos.lng() - (0.5 * (newpos.lng() - nextpos.lng()))
		));
		nextpos = null;
	}
	newpos = null;
	index = null;
};

var removeVMarkers = function(index) {
	if (markers.length > 0) {//clicked marker has already been deleted
		if (index != markers.length) {
			vmarkers[index].setMap(null);
			vmarkers.splice(index, 1);
		} else {
			vmarkers[index-1].setMap(null);
			vmarkers.splice(index-1, 1);
		}
	}
	if (index != 0 && index != markers.length) {
		var prevpos = markers[index-1].getPosition();
		var newpos = markers[index].getPosition();
		vmarkers[index-1].setPosition(new google.maps.LatLng(
			newpos.lat() - (0.5 * (newpos.lat() - prevpos.lat())),
			newpos.lng() - (0.5 * (newpos.lng() - prevpos.lng()))
		));
		prevpos = null;
		newpos = null;
	}
	index = null;
};




