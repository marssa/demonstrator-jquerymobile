var mapObjects = {
	polyLine : null,
	tmpPolyLine : null,
	markers : [],
	vmarkers : [],
	arrayPath : [],
	map : null,
	id : 0,
	waypoints : {
		waypoints : []
	}
}

function initMap(mapHolder) {
	mapObjects.markers = [];
	mapObjects.vmarkers = [];
	var mapOptions = {
		zoom : 25,
		center : new google.maps.LatLng(35.88923, 14.51721),
		mapTypeId : google.maps.MapTypeId.HYBRID,
		draggableCursor : 'auto',
		draggingCursor : 'move',
		disableDoubleClickZoom : true
	};

	mapObjects.map = new google.maps.Map(document.getElementById(mapHolder),
			mapOptions);
	google.maps.event.addListener(mapObjects.map, "click", mapLeftClick);
	mapHolder = null;
	mapOptions = null;

};

$('#NavDisplay').live('pageshow', function() {

	var coordinatesInterrupt;
	initMap('map_canvas');

	boatMarker = new google.maps.Marker({
		map : mapObjects.map,
	});
	// trackPosition();
	// coordinatesInterrupt = setInterval("trackPosition()", 10000);
	initPolyline();

	// disabling control buttons
	$('#reverse_button').addClass('ui-disabled');
	$('#start_following_button').addClass('ui-disabled');
	$('#stop_following_button').addClass('ui-disabled');

	$('#NavDisplay').live('pagehide', function() {
		clearInterval(coordinatesInterrupt);
		coordinatesInterrupt = null;
	});

	$("#new_trip_button").live('vmousedown', function() {
		mapObjects.waypoints = {
			waypoints : []
		};
		initMap('map_canvas');
		initPolyline();
		mapObjects.markers = [];
	});

	$('#reverse_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/reverseRoute",
			data : "{}",
			dataType : "json",
			success : function() {
				$('#status_bar').empty();
				$('#status_bar').append("Reversing Route!");
			},
			error : function() {
				$('#status_bar').empty();
				$('#status_bar').append("Reverse Route not working!");
			}
		});

	});

	$('#start_following_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/startFollowing",
			data : "{}",
			dataType : "json",
			success : function() {
				$('#status_bar').empty();
				$("#status_bar").css("color", "green");
				$('#status_bar').append("Started Following!");
				
				$('#stop_following_button').removeClass('ui-disabled');
				$('#start_following_button').addClass('ui-disabled');
				$('#reverse_button').removeClass('ui-disabled');
			},
			error : function() {
				$('#status_bar').empty();
				$("#status_bar").css("color", "red");
				$('#status_bar').append("Start Following - not working!");
			}
		});

	});

	$('#stop_following_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/stopFollowing",
			data : "{}",
			dataType : "json",
			success : function() {
				$('#status_bar').empty();
				$("#status_bar").css("color", "green");
				$('#status_bar').append("Stopped Following!");

				$('#reverse_button').removeClass('ui-disabled');
				$('#start_following_button').removeClass('ui-disabled');
				$('#stop_following_button').removeClass('ui-disabled');
			},
			error : function() {
				// alert("Stop Following - not working!");
				$('#status_bar').empty();
				$("#status_bar").css("color", "red");
				$('#status_bar').append("Stop Following - not working!");
			}
		});

	});

	$('#come_home_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "/application/json; charset=utf-8",
			url : "pathPlanner/comeHome",
			data : "{}",
			dataType : "json",
			success : function() {
			
				$('#status_bar').empty();
				$("#status_bar").css("color", "green");
				$('#status_bar').append("Coming Home!");
				
			},
			error : function() {
				$('#status_bar').empty();
				$("#status_bar").css("color", "red");
				$('#status_bar').append("Not Coming Home! :-(");
			}
		});

	});

	$('#pass_waypoints_button').click(function() {
		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/waypoints",
			data : JSON.stringify(mapObjects.waypoints),
			dataType : "json",
			statusCode : {
				200 : function() {
					$('#status_bar').empty();
					$('#status_bar').append("No Waypoints selected!");

				},
				201 : function() {

					// alert("Waypoints sent successfully!");
					$('#status_bar').empty();
					  $("#status_bar").css("color", "green");
					$('#status_bar').append("Waypoints sent successfully!");
					$('#start_following_button').removeClass('ui-disabled');
					$('#pass_waypoints_button').addClass('ui-disabled');
					$('#new_trip_button').addClass('ui-disabled');
				},
				404 : function() {
					$('#status_bar').empty();
					$("#status_bar").css("color", "red");
					$('#status_bar').append("Unsuccesful, Please try again");

				},
				500 : function() {
					$('#status_bar').empty();
					$("#status_bar").css("color", "red");
					$('#status_bar').append("Internal Error");

				}
			}

		});

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
				mapObjects.map.setCenter(new google.maps.LatLng(lt, lg));
				// boatMarker.setPosition(new google.maps.LatLng(lt, lg));

			},
			error : function(result) {
				clearInterval(coordinatesInterrupt);
				alert(result.status);
			}
		});

	}
	;

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
	mapObjects.polyLine = new google.maps.Polyline(polyOptions);
	mapObjects.polyLine.setMap(mapObjects.map);
	mapObjects.tmpPolyLine = new google.maps.Polyline(tmpPolyOptions);
	mapObjects.tmpPolyLine.setMap(mapObjects.map);
};

var mapLeftClick = function(event) {

	var path = mapObjects.polyLine.getPath();
	if (event.latLng) {
		// Code used when tracking position is on
		/*
		 * if (markers.length ==0){ var firstMarker =
		 * createMarker(boatMarker.getPosition()); markerName= 'Boat Start
		 * Position'; markers.push(firstMarker);
		 * 
		 * path.push(boatMarker.getPosition()); }
		 */
		var marker = createMarker(event.latLng);
		mapObjects.markers.push(marker);

		if (mapObjects.markers.length != 1) {
			var vmarker = createVMarker(event.latLng);
			mapObjects.vmarkers.push(vmarker);
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
		map : mapObjects.map,
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
		for ( var m = 0; m < mapObjects.markers.length; m++) {
			if (mapObjects.markers[m] == marker) {
				mapObjects.polyLine.getPath().setAt(m, marker.getPosition());
				moveVMarker(m);
				break;
			}
		}
		m = null;
	});

	// removing marker on double click
	google.maps.event.addListener(marker, "dblclick", function() {
		for ( var m = 0; m < mapObjects.markers.length; m++) {
			if (mapObjects.markers[m] == marker) {
				marker.setMap(null);
				mapObjects.markers.splice(m, 1);
				mapObjects.polyLine.getPath().removeAt(m);
				removeVMarkers(m);
				break;
			}
		}
		m = null;
	});
	return marker;
};

var createVMarker = function(point) {
	var prevpoint = mapObjects.markers[mapObjects.markers.length - 2]
			.getPosition();
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
		map : mapObjects.map,
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
		for ( var m = 0; m < mapObjects.vmarkers.length; m++) {
			if (mapObjects.vmarkers[m] == marker) {
				var tmpPath = mapObjects.tmpPolyLine.getPath();
				tmpPath.push(mapObjects.markers[m].getPosition());
				tmpPath.push(mapObjects.vmarkers[m].getPosition());
				tmpPath.push(mapObjects.markers[m + 1].getPosition());
				break;
			}
		}
		m = null;
	});
	google.maps.event.addListener(marker, "drag",
			function() {
				for ( var m = 0; m < mapObjects.vmarkers.length; m++) {
					if (mapObjects.vmarkers[m] == marker) {
						mapObjects.tmpPolyLine.getPath().setAt(1,
								marker.getPosition());
						readPolyLine();
						break;
					}
				}
				m = null;
			});
	google.maps.event.addListener(marker, "dragend", function() {
		for ( var m = 0; m < mapObjects.vmarkers.length; m++) {
			if (mapObjects.vmarkers[m] == marker) {
				var newpos = marker.getPosition();
				var startMarkerPos = mapObjects.markers[m].getPosition();
				var firstVPos = new google.maps.LatLng(newpos.lat()
						- (0.5 * (newpos.lat() - startMarkerPos.lat())), newpos
						.lng()
						- (0.5 * (newpos.lng() - startMarkerPos.lng())));
				var endMarkerPos = mapObjects.markers[m + 1].getPosition();
				var secondVPos = new google.maps.LatLng(newpos.lat()
						- (0.5 * (newpos.lat() - endMarkerPos.lat())), newpos
						.lng()
						- (0.5 * (newpos.lng() - endMarkerPos.lng())));
				var newVMarker = createVMarker(secondVPos);
				newVMarker.setPosition(secondVPos);// apply the correct
				// position to the vmarker
				var newMarker = createMarker(newpos);
				mapObjects.markers.splice(m + 1, 0, newMarker);
				mapObjects.polyLine.getPath().insertAt(m + 1, newpos);
				marker.setPosition(firstVPos);
				mapObjects.vmarkers.splice(m + 1, 0, newVMarker);
				mapObjects.tmpPolyLine.getPath().removeAt(2);
				mapObjects.tmpPolyLine.getPath().removeAt(1);
				mapObjects.tmpPolyLine.getPath().removeAt(0);
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

function readPolyLine() {
	mapObjects.arrayPath = mapObjects.polyLine.getPath();
	mapObjects.waypoints = {
		waypoints : []
	};
	mapObjects.id = 0;
	for ( var i = 0; i < mapObjects.arrayPath.length; i++) {

		markerName = 'Waypoint #' + mapObjects.id++;
		waypoint = {
			name : markerName,
			id : mapObjects.id,
			lat : mapObjects.arrayPath.getAt(i).lat(),
			lng : mapObjects.arrayPath.getAt(i).lng()
		}
		mapObjects.waypoints.waypoints.push(waypoint);
	}

};

var moveVMarker = function(index) {
	var newpos = mapObjects.markers[index].getPosition();
	if (index != 0) {
		var prevpos = mapObjects.markers[index - 1].getPosition();
		mapObjects.vmarkers[index - 1].setPosition(new google.maps.LatLng(
				newpos.lat() - (0.5 * (newpos.lat() - prevpos.lat())), newpos
						.lng()
						- (0.5 * (newpos.lng() - prevpos.lng()))));
		prevpos = null;
	}
	if (index != mapObjects.markers.length - 1) {
		var nextpos = mapObjects.markers[index + 1].getPosition();
		mapObjects.vmarkers[index].setPosition(new google.maps.LatLng(newpos
				.lat()
				- (0.5 * (newpos.lat() - nextpos.lat())), newpos.lng()
				- (0.5 * (newpos.lng() - nextpos.lng()))));
		nextpos = null;
	}
	newpos = null;
	index = null;
};

var removeVMarkers = function(index) {
	if (mapObjects.markers.length > 0) {// clicked marker has already been
		// deleted
		if (index != mapObjects.markers.length) {
			mapObjects.vmarkers[index].setMap(null);
			mapObjects.vmarkers.splice(index, 1);
		} else {
			mapObjects.vmarkers[index - 1].setMap(null);
			mapObjects.vmarkers.splice(index - 1, 1);
		}
	}
	if (index != 0 && index != mapObjects.markers.length) {
		var prevpos = mapObjects.markers[index - 1].getPosition();
		var newpos = mapObjects.markers[index].getPosition();
		mapObjects.vmarkers[index - 1].setPosition(new google.maps.LatLng(
				newpos.lat() - (0.5 * (newpos.lat() - prevpos.lat())), newpos
						.lng()
						- (0.5 * (newpos.lng() - prevpos.lng()))));
		prevpos = null;
		newpos = null;
	}
	index = null;
};
