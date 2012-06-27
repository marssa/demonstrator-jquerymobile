$('#NavDisplay').live('pageshow', function() {


	$("#new_trip_button").live('vmousedown', function(event) {
		map.clearOverlays();

	});

	$('#reverse_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/reverseRoute",
			data : "{}",
			dataType : "json",
			success : function() {
				alert("Reversing Route!");
			},
			error : function() {
				alert("Reverse Route not working!");
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
				alert("Started Following!");
			},
			error : function() {
				alert("Start Following - not working!");
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
				alert("Stopped Following!");
			},
			error : function() {
				alert("Stop Following - not working!");
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
				alert("Coming Home!");
			},
			error : function() {
				alert("Coming Home - not working!");
			}
		});

	});
	


	$('#pass_waypoints_button').click(function() {
		
		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/waypoints",
			data :'{"waypoints" :' + JSON.stringify(waypoints) + '}',
			dataType : "json",
			success : function() {
				
				alert("Waypoints sent successfully!");
				$('#reverse_button').removeClass('ui-disabled');
				$('#start_following_button').removeClass('ui-disabled');
				$('#stop_following_button').removeClass('ui-disabled');
			},
			error : function() {
				
				alert('Waypoints not sent, JSON String sent: \n \n' + '{"waypoints" :' + JSON.stringify(waypoints) + '}');
			}
		
		});

	});
	
	function loadWaypoints(waypoint){
//		var markerName = $('#textbox').val();
		
	//	alert(waypoint.waypointID);
		//lat = marker.getPosition().lat();
		//lng = marker.getPosition().lng();
		
	/*	h3 = '<h3>' + markerName + '</h3>';
		// split into Degrees, Minutes, Seconds

		latdeg = Math.floor(lat);
		latmin = Math.floor((lat % 1) * 60);
		latsec = Math.round(((((lat % 1) * 60) % 1) * 60) * 100) / 100;

		lngdeg = Math.floor(lng);
		lngmin = Math.floor((lat % 1) * 60);
		lngsec = Math.floor(((((lng % 1) * 60) % 1) * 60) * 100) / 100;

		latshow = "<p>Latitude: " + latdeg + "\u00B0 " + latmin + "\' "
				+ latsec + "\" </p>";
		lngshow = "<p>Longitude: " + lngdeg + "\u00B0 " + lngmin
				+ "\' " + lngsec + "\"</p>";

		infoWindow.close();
		marker.setTitle(markerName + ", Lat:" + latdeg + "\u00B0 "
				+ latmin + "\' " + latsec + "\"" + ", Lng:" + lngdeg
				+ "\u00B0 " + lngmin + "\' " + lngsec + "\"");

		// build & add collapsible item
		div = $('<div/>');
		div.attr('data-role', 'collapsible');
		div.attr('data-theme', 'e');
		div.attr('data-content-theme', 'e');
		div.append(h3);
		div.append(latshow);
		div.append(lngshow);
		// add waypoint to list
		$('#markers-input').append(div);
		$('#markers-input').find('div[data-role=collapsible]')
				.collapsible({
					theme : 'c',
					refresh : true
				});*/
	}

});
