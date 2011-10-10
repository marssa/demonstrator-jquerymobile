$('#NavDisplay').live("pageshow", function() {
	
//Replaced by co-ordinates retrieved from the GPS sensors
/*	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			initialize(position.coords.latitude,position.coords.longitude);
		});
	} 
*/
	
//initialize(35.889013, 14.517207);
	
/*	$.ajax({
        async: false,
        type: "POST",
        url: "     ",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        success: function (result) {
        	alert(jQuery.parseJSON(result.d));
        },
        error: AjaxFailed
    });*/
	
	var testLatLng= {"class":"mise.marssa.data_types.composite_datatypes.Coordinate","latitude":{"DMS":{"class":"mise.marssa.data_types.float_datatypes.DegreesFloat","value":35.889013},"class":"mise.marssa.data_types.composite_datatypes.Latitude","degrees":{"class":"mise.marssa.data_types.integer_datatypes.DegreesInteger","value":0},"minutes":{"class":"mise.marssa.data_types.integer_datatypes.MInteger","value":21},"seconds":{"class":"mise.marssa.data_types.float_datatypes.MFloat","value":0.0}},"longitude":{"DMS":{"class":"mise.marssa.data_types.float_datatypes.DegreesFloat","value":14.517207},"class":"mise.marssa.data_types.composite_datatypes.Longitude","degrees":{"class":"mise.marssa.data_types.integer_datatypes.DegreesInteger","value":78},"minutes":{"class":"mise.marssa.data_types.integer_datatypes.MInteger","value":48},"seconds":{"class":"mise.marssa.data_types.float_datatypes.MFloat","value":1.2}}};
	jQuery.parseJSON(testLatLng);
	lat = testLatLng['latitude']['DMS']['value'];
	lng = testLatLng['longitude']['DMS']['value'];
	initialize(lat,lng);
});

var map = null;
var infoWindow; 
var contentString = '<div data-role="fieldcontain" id="marker-form" style=" width: 200px; height: 75px"> ' +
						'<label for="name">Enter name of location:</label><br/><br/>'+
						'<input type="text" id="textbox" name="wp-name" value=""  />' +
						'<input type="submit" value="Add" id="submit-button" />'+
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
    
    google.maps.event.addListener(marker1, 'position_changed', function(event){
    	marker1.getPosition();
    	
    }
}

function addLatLng(event){
	var path = poly.getPath();
	path.push(event.latLng);
}

var marker1;
function placeMarker(location) {
	
	marker1 = new google.maps.Marker({
    	      position: location, 
    	      map: map,
    	      draggable: true
	});
    	  
	 map.setCenter(location);
	 infoWindow.setContent(contentString);
	 infoWindow.open(map,marker1);
}
/*
$('#submit-button').live("click", function() {
	var markerName = $('#textbox').val();
  	a = $('<a/>');
 	a.text(markerName);
	infoWindow.close(); 
  	a.attr('href', '#Waypoints');
  	a.attr('data-transition', 'slide');
  	li = $('<li/>');
    li.append(a);
    $('#markers-list').append(li);
	$('#markers-list').listview('refresh');

});*/

$('#submit-button').live("click", function() {
	var markerName = $('#textbox').val();
	h3 = '<h3>' + markerName + '</h3>';
	
	
	//split into Degrees, Minutes, Seconds
	lat = marker1.getPosition().lat();
	latdeg = Math.floor(lat);
	latmin = Math.floor((lat % 1)* 60 );
	latsec = Math.round( ( (((lat % 1) * 60) % 1) * 60) * 100) / 100;
	lng = marker1.getPosition().lng();
	lngdeg = Math.floor(lng);
	lngmin = Math.floor((lat % 1)* 60 );
	lngsec = Math.floor( ( (((lng % 1) * 60) % 1) * 60) * 100) / 100;
	
	latshow = "<p>Latitude: " + latdeg + "\u00B0 " + latmin + "\' " + latsec + "\" </p>";
	lngshow = "<p>Longitude: " + lngdeg + "\u00B0 " + lngmin + "\' " + lngsec + "\"</p>";
	
	infoWindow.close(); 
	
	marker1.setTitle(markerName + ", Lat:" +  latdeg + "\u00B0 " + latmin + "\' " + latsec + "\"" + ", Lng:" + lngdeg + "\u00B0 " + lngmin + "\' " + lngsec + "\"");
	
	//build & add collapsible item
	div = $('<div/>');
  	div.attr('data-role', 'collapsible');
  	div.attr('data-theme','e');
  	div.attr('data-content-theme', 'e');
  	div.append(h3);
  	div.append(latshow);
  	div.append(lngshow);
  	
    $('#markers-input').append(div);
    $('#markers-input').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

}); 


//var map = null;
//var polyLine;
var tmpPolyLine;
var markers = [];
var vmarkers = [];
var g = google.maps;

var initMap = function(mapHolder) {
	markers = [];
	vmarkers = [];
	/*var mapOptions = {
		zoom: 7,
		center: new g.LatLng(52.092, 5.121), 
		mapTypeId: g.MapTypeId.HYBRID,
		draggableCursor: 'auto',
		draggingCursor: 'move',
		disableDoubleClickZoom: true
	};*/
	var mapOptions = {
			zoom: 18,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.SATELLITE
	    };
	
	
	map = new g.Map(document.getElementById(mapHolder), mapOptions);
	g.event.addListener(map, "click", mapLeftClick);
	mapHolder = null;
	mapOptions = null;
};

var initPolyline = function() {
	var polyOptions = {
		strokeColor: "#3355FF",
		strokeOpacity: 0.8,
		strokeWeight: 4
	};
	var tmpPolyOptions = {
		strokeColor: "#3355FF",
		strokeOpacity: 0.4,
		strokeWeight: 4
	};
	polyLine = new g.Polyline(polyOptions);
	polyLine.setMap(map);
	tmpPolyLine = new g.Polyline(tmpPolyOptions);
	tmpPolyLine.setMap(map);
};

var mapLeftClick = function(event) {
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
		marker = null;
	}
	event = null;
};

var createMarker = function(point) {
	var imageNormal = new g.MarkerImage(
		"square.png",
		new g.Size(11, 11),
		new g.Point(0, 0),
		new g.Point(6, 6)
	);
	var imageHover = new g.MarkerImage(
		"square_over.png",
		new g.Size(11, 11),
		new g.Point(0, 0),
		new g.Point(6, 6)
	);
	var marker = new g.Marker({
		position: point,
		map: map,
		icon: imageNormal,
		draggable: true
	});
	g.event.addListener(marker, "mouseover", function() {
		marker.setIcon(imageHover);
	});
	g.event.addListener(marker, "mouseout", function() {
		marker.setIcon(imageNormal);
	});
	g.event.addListener(marker, "drag", function() {
		for (var m = 0; m < markers.length; m++) {
			if (markers[m] == marker) {
				polyLine.getPath().setAt(m, marker.getPosition());
				moveVMarker(m);
				break;
			}
		}
		m = null;
	});
	g.event.addListener(marker, "click", function() {
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
	var prevpoint = markers[markers.length-2].getPosition();
	var imageNormal = new g.MarkerImage(
		"square_transparent.png",
		new g.Size(11, 11),
		new g.Point(0, 0),
		new g.Point(6, 6)
	);
	var imageHover = new g.MarkerImage(
		"square_transparent_over.png",
		new g.Size(11, 11),
		new g.Point(0, 0),
		new g.Point(6, 6)
	);
	var marker = new g.Marker({
		position: new g.LatLng(
			point.lat() - (0.5 * (point.lat() - prevpoint.lat())),
			point.lng() - (0.5 * (point.lng() - prevpoint.lng()))
		),
		map: map,
		icon: imageNormal,
		draggable: true
	});
	g.event.addListener(marker, "mouseover", function() {
		marker.setIcon(imageHover);
	});
	g.event.addListener(marker, "mouseout", function() {
		marker.setIcon(imageNormal);
	});
	g.event.addListener(marker, "dragstart", function() {
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
	g.event.addListener(marker, "drag", function() {
		for (var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				tmpPolyLine.getPath().setAt(1, marker.getPosition());
				break;
			}
		}
		m = null;
	});
	g.event.addListener(marker, "dragend", function() {
		for (var m = 0; m < vmarkers.length; m++) {
			if (vmarkers[m] == marker) {
				var newpos = marker.getPosition();
				var startMarkerPos = markers[m].getPosition();
				var firstVPos = new g.LatLng(
					newpos.lat() - (0.5 * (newpos.lat() - startMarkerPos.lat())),
					newpos.lng() - (0.5 * (newpos.lng() - startMarkerPos.lng()))
				);
				var endMarkerPos = markers[m+1].getPosition();
				var secondVPos = new g.LatLng(
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
		vmarkers[index-1].setPosition(new g.LatLng(
			newpos.lat() - (0.5 * (newpos.lat() - prevpos.lat())),
			newpos.lng() - (0.5 * (newpos.lng() - prevpos.lng()))
		));
		prevpos = null;
	}
	if (index != markers.length - 1) {
		var nextpos = markers[index+1].getPosition();
		vmarkers[index].setPosition(new g.LatLng(
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
		vmarkers[index-1].setPosition(new g.LatLng(
			newpos.lat() - (0.5 * (newpos.lat() - prevpos.lat())),
			newpos.lng() - (0.5 * (newpos.lng() - prevpos.lng()))
		));
		prevpos = null;
		newpos = null;
	}
	index = null;
};

window.onload = function() {
	initMap('mapcontainer');
	initPolyline();
};




