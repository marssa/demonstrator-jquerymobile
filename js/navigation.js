$('#NavDisplay').live('pageshow', function() {


	$("#new_trip_button").live('vmousedown', function(event) {
		map.clearOverlays();

	});

	$('#reverse_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8182/pathPlanner/reverseRoute",
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
			url : "http://localhost:8182/pathPlanner/startFollowing",
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
			url : "http://localhost:8182/pathPlanner/stopFollowing",
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
			url : "http://localhost:8182/pathPlanner/comeHome",
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
			url : "http://localhost:8182/pathPlanner/waypoints",
			data : waypointsArray,
			success : function() {
				alert("Waypoints sent successfully!");
			},
			error : function() {
				alert("Waypoints list not sent!");
			},
			dataType : "json"
		});

	});

});
