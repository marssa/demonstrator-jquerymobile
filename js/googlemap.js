var coordinatesInterrupt;
var polyLine;
var tmpPolyLine;
var markers = [];
var vmarkers = [];
var arrayPath =[];
var map = null;
var boatMarker;
var contentString = '<div data-role="fieldcontain" id="marker-form" style=" width: 200px; height: 75px"> '
		+ '<label for="name">Enter  Waypoint Name:</label><br/><br/>'
		+ '<input type="text" id="textbox" name="wp-name" value=""  />'
		+ '</div>';

var id = 0;
var waypoints = {waypoints: []};

$('#NavDisplay').live('pageshow', function() {

	initMap('map_canvas');
	


	boatMarker = new google.maps.Marker({
		map : map,
	});
//	trackPosition();
//	coordinatesInterrupt = setInterval("trackPosition()", 10000);
	initPolyline();

	// disabling control buttons
	$('#reverse_button').addClass('ui-disabled');
	$('#start_following_button').addClass('ui-disabled');
	$('#stop_following_button').addClass('ui-disabled');

});

$('#NavDisplay').live('pagehide', function() {
	clearInterval(coordinatesInterrupt);
	coordinatesInterrupt = null;
});

function trackPosition() {

	$.ajax({
		url : "gps/coordinates",
		dataType : "json",
		data : {},
		async : false,
		success : function(coordinate) {
			lt = 35.889446; 
			lg = 14.518411;
			map.setCenter(new google.maps.LatLng(lt, lg));
	//		boatMarker.setPosition(new google.maps.LatLng(lt, lg));
		
		},
		error : function(result) {
			clearInterval(coordinatesInterrupt);
			alert(result.status);
		}
	});

};

function initMap(mapHolder) {
	markers = [];
	vmarkers = [];
	var mapOptions = {
		zoom : 25,
		center : new google.maps.LatLng(35.88923, 14.51721),
		mapTypeId : google.maps.MapTypeId.HYBRID,
		draggableCursor : 'auto',
		draggingCursor : 'move',
		disableDoubleClickZoom : true
	};

	map = new google.maps.Map(document.getElementById(mapHolder), mapOptions);
	google.maps.event.addListener(map, "click", mapLeftClick);
	mapHolder = null;
	mapOptions = null;

};
$('#NavDisplay').live('pageshow', function() {

$("#new_trip_button").live('vmousedown', function() {
	initMap('map_canvas');
	initPolyline();
	waypoints = {waypoints: []};
	markers = [];

});
});

var initPolyline = function() {
	var polyOptions = {
		strokeColor : "#F0E21D",
		strokeOpacity : 0.8,
		strokeWeight : 4
	};
	var tmpPolyOptions = {
		strokeColor : "#F0E21D",
		strokeOpacity : 0.4,
		strokeWeight : 4
	};
	polyLine = new google.maps.Polyline(polyOptions);
	polyLine.setMap(map);
	tmpPolyLine = new google.maps.Polyline(tmpPolyOptions);
	tmpPolyLine.setMap(map);
};


var mapLeftClick = function(event) {

	var path = polyLine.getPath();
	if (event.latLng) {
	//Code used when tracking position is on
		/*	if (markers.length ==0){
			var firstMarker = createMarker(boatMarker.getPosition());
			markerName= 'Boat Start Position';
			markers.push(firstMarker);
			
			path.push(boatMarker.getPosition());
		}*/
		var marker = createMarker(event.latLng);
		markers.push(marker);
				
		if (markers.length != 1) {
			var vmarker = createVMarker(event.latLng);
			vmarkers.push(vmarker);
			vmarker = null;
		}
			
		path.push(event.latLng);
		readPolyLine();
		marker = null;
	}
	event = null;
};

var createMarker = function(point) {
	
	var imageNormal = new google.maps.MarkerImage("img/boat-icon-normal.png",
			new google.maps.Size(11, 11), new google.maps.Point(0, 0),
			new google.maps.Point(6, 6));
	var imageHover = new google.maps.MarkerImage("img/boat-icon-fade.png",
			new google.maps.Size(11, 11), new google.maps.Point(0, 0),
			new google.maps.Point(6, 6));
	var marker = new google.maps.Marker({
		position : point,
		map : map,
		icon : imageNormal,
		draggable : true
	});

	google.maps.event.addListener(marker, "mouseover", function() {
		marker.setIcon(imageHover);
	});

	google.maps.event.addListener(marker, "mouseout", function() {
		marker.setIcon(imageNormal);
	});

	google.maps.event.addListener(marker, "drag", function() {
		for ( var m = 0; m < markers.length; m++) {
			if (markers[m] == marker) {
				polyLine.getPath().setAt(m, marker.getPosition());
				moveVMarker(m);
				break;
			}
		}
		m = null;
	});

	// removing marker on double click
	google.maps.event.addListener(marker, "dblclick", function() {
		for ( var m = 0; m < markers.length; m++) {
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
	var prevpoint = markers[markers.length - 2].getPosition();
	var imageNormal = new google.maps.MarkerImage("img/x.png",
			new google.maps.Size(11, 11), new google.maps.Point(0, 0),
			new google.maps.Point(6, 6));
	var imageHover = new google.maps.MarkerImage("img/x-hover.png",
			new google.maps.Size(11, 11), new google.maps.Point(0, 0),
			new google.maps.Point(6, 6));
	var marker = new google.maps.Marker({
		position : new google.maps.LatLng(point.lat()
				- (0.5 * (point.lat() - prevpoint.lat())), point.lng()
				- (0.5 * (point.lng() - prevpoint.lng()))),
		map : map,
		icon : imageNormal,
		draggable : true
	});
	google.maps.event.addListener(marker, "mouseover", function() {
		marker.setIcon(imageHover);
	});
	google.maps.event.addListener(marker, "mouseout", function() {
		marker.setIcon(imageNormal);
	});
	google.maps.event.addListener(marker, "dragstart", function() {
		for ( var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				var tmpPath = tmpPolyLine.getPath();
				tmpPath.push(markers[m].getPosition());
				tmpPath.push(vmarkers[m].getPosition());
				tmpPath.push(markers[m + 1].getPosition());
				break;
			}
		}
		m = null;
	});
	google.maps.event.addListener(marker, "drag", function() {
		for ( var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				tmpPolyLine.getPath().setAt(1, marker.getPosition());
				readPolyLine();
				break;
			}
		}
		m = null;
	});
	google.maps.event.addListener(marker, "dragend", function() {
		for ( var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				var newpos = marker.getPosition();
				var startMarkerPos = markers[m].getPosition();
				var firstVPos = new google.maps.LatLng(newpos.lat()
						- (0.5 * (newpos.lat() - startMarkerPos.lat())), newpos
						.lng()
						- (0.5 * (newpos.lng() - startMarkerPos.lng())));
				var endMarkerPos = markers[m + 1].getPosition();
				var secondVPos = new google.maps.LatLng(newpos.lat()
						- (0.5 * (newpos.lat() - endMarkerPos.lat())), newpos
						.lng()
						- (0.5 * (newpos.lng() - endMarkerPos.lng())));
				var newVMarker = createVMarker(secondVPos);
				newVMarker.setPosition(secondVPos);// apply the correct
				// position to the vmarker
				var newMarker = createMarker(newpos);
				markers.splice(m + 1, 0, newMarker);
				polyLine.getPath().insertAt(m + 1, newpos);
				marker.setPosition(firstVPos);
				vmarkers.splice(m + 1, 0, newVMarker);
				tmpPolyLine.getPath().removeAt(2);
				tmpPolyLine.getPath().removeAt(1);
				tmpPolyLine.getPath().removeAt(0);
				readPolyLine();
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

function readPolyLine(){
	arrayPath = polyLine.getPath();
	waypoints = {waypoints: []};
	id = 0;
	for (var i=0; i< arrayPath.length;i++){
		
		markerName = 'Waypoint #' + id++;
		waypoint = {name : markerName, id: id, lat : arrayPath.getAt(i).lat(), lng : arrayPath.getAt(i).lng() }
		waypoints.waypoints.push(waypoint);
	}
	
	
};

var moveVMarker = function(index) {
	var newpos = markers[index].getPosition();
	if (index != 0) {
		var prevpos = markers[index - 1].getPosition();
		vmarkers[index - 1].setPosition(new google.maps.LatLng(newpos.lat()
				- (0.5 * (newpos.lat() - prevpos.lat())), newpos.lng()
				- (0.5 * (newpos.lng() - prevpos.lng()))));
		prevpos = null;
	}
	if (index != markers.length - 1) {
		var nextpos = markers[index + 1].getPosition();
		vmarkers[index].setPosition(new google.maps.LatLng(newpos.lat()
				- (0.5 * (newpos.lat() - nextpos.lat())), newpos.lng()
				- (0.5 * (newpos.lng() - nextpos.lng()))));
		nextpos = null;
	}
	newpos = null;
	index = null;
};

var removeVMarkers = function(index) {
	if (markers.length > 0) {// clicked marker has already been deleted
		if (index != markers.length) {
			vmarkers[index].setMap(null);
			vmarkers.splice(index, 1);
		} else {
			vmarkers[index - 1].setMap(null);
			vmarkers.splice(index - 1, 1);
		}
	}
	if (index != 0 && index != markers.length) {
		var prevpos = markers[index - 1].getPosition();
		var newpos = markers[index].getPosition();
		vmarkers[index - 1].setPosition(new google.maps.LatLng(newpos.lat()
				- (0.5 * (newpos.lat() - prevpos.lat())), newpos.lng()
				- (0.5 * (newpos.lng() - prevpos.lng()))));
		prevpos = null;
		newpos = null;
	}
	index = null;
};
