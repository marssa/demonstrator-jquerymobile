$('#NavDisplay').live('pageshow', function() {

	function Waypoints(){
		
		
		
		
	}
	
	$("#new_trip_button").live('vmousedown', function(event) {
		map.clearOverlays();

	});

	$('#reverse_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/reverseRoute",
			data : "{}",
			dataType : "json"
		});

	});

	$('#start_trip_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/startFollowing",
			data : "{}",
			dataType : "json"
		});

	});

	$('#stop_following_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/stopFollowing",
			data : "{}",
			dataType : "json"
		});

	});

	$('#come_home_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/comeHome",
			data : "{}",
			dataType : "json"
		});

	});

	$('#pass_waypoints_button').click(function() {

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "pathPlanner/waypoints",
			data : waypoints,
			dataType : "json",
			traditional: true
		});

	});

});
