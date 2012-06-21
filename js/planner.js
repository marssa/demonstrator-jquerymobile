$('#planner').live('pageshow', function() {
	$('#start-planner').click(function() {
		
		$.getJSON("pathPlanner/waypoints",
			[
				{
					waypointID: "0",
					waypointName: "Starting point",
					waypointLat: "35.983267",
					waypointLon: "14.387419"
				},
				{
					waypointID: "1",
					waypointName: "Waypoint 1",
					waypointLat: "36.000184",
					waypointLon: "14.376021"
				},
				{
					waypointID: "2",
					waypointName: "Waypoint 2",
					waypointLat: "36.010598",
					waypointLon: "14.391477"
				},
				{
					waypointID: "3",
					waypointName: "Waypoint 3",
					waypointLat: "36.024835",
					waypointLon: "14.339797"
				},
				{
					waypointID: "4",
					waypointName: "Waypoint 4",
					waypointLat: "36.021192",
					waypointLon: "14.339797"
				},
				{
					waypointID: "5",
					waypointName: "Waypoint 5",
					waypointLat: "36.015387",
					waypointLon: "14.322254"
				}
			],
			function(data) {
				alert("Handler for .click() called.");
			}
		);
	});
});
