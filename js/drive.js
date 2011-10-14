$('#Drive').live('pageshow', function() {
	var t;
	var currentSpeedInterrupt = setInterval(currentSpeed(), 500);
	
	$("#move-forward").live('vmousedown', function(event) {
		increaseSpeed();
		removeHighLight('forward-button');
		showHighLight('forward-button-hl');
		t = setInterval("increaseSpeed()",500);
	});

	$("#move-forward").live('vmouseup', function(event) {
		clearInterval(t);
		removeHighLight('forward-button-hl');
		showHighLight('forward-button');
	});

	$("#move-backward").live('vmousedown', function(event) {
		decreaseSpeed();
		removeHighLight('down-button');
		showHighLight('down-button-hl');
		t = setInterval("decreaseSpeed()",500);
	});

	$("#move-backward").live('vmouseup', function(event) {
		clearInterval(t);
		removeHighLight('down-button-hl');
		showHighLight('down-button');
	});

	$("#turn-starboard").live('vmousedown', function(event) {
		turnSB();
		removeHighLight('sb-button');
		showHighLight('sb-button-hl');
		t = setInterval("turnSB()",500);
	});

	$("#turn-starboard").live('vmouseup', function(event) {
		clearInterval(t)
		removeHighLight('sb-button-hl');
		showHighLight('sb-button');
	});

	$("#turn-portside").live('vmousedown', function(event) {
		turnPS();
		removeHighLight('ps-button');
		showHighLight('ps-button-hl');
		t = setInterval("turnPS()",500);
	});

	$("#turn-portside").live('vmouseup', function(event) {
		clearInterval(t);
		removeHighLight('ps-button-hl');
		showHighLight('ps-button');
	});

	$("#stop").live('vclick', function(event) {
		setSpeed(0);
		removeHighLight('stop-button');
		showHighLight('stop-button-hl');
		setTimeout("removeHighLight('stop-button-hl');",200);
		setTimeout("showHighLight('stop-button');",200);
	});

	$("#full-astern").live('vclick', function(event) {
		setSpeed(-100);
	});

	$("#full-ahead").live('vclick', function(event) {
		setSpeed(100);
	});
});

$('#Drive').live('pagehide', function(event, ui) {
	clearInterval(currentSpeedInterrupt);
	clearInterval(t);
	currentSpeedInterrupt = null;
	t = null;
});

function decreaseSpeed(){
	$.ajax({
		  url: "motor/decreaseSpeed",
		  dataType: "json",
		  data: data,
		  async: true
	});
}
function increaseSpeed(){
	$.ajax({
		  url: "motor/increaseSpeed",
		  dataType: "json",
		  data: data,
		  async: true
	});
}
function setSpeed(speed){
	$.ajax({
		  url: "motor/speed/" + speed,
		  dataType: "json",
		  data: data,
		  async: true
	});
}
function turnSB(){
	$.ajax({
		  url: "motor/speed/true",
		  dataType: "json",
		  data: data,
		  async: true
	});
}
function turnPS(){
	$.ajax({
		  url: "rudder/rotate/false",
		  dataType: "json",
		  data: data,
		  async: true
	});
}
function currentSpeed(){
	$.ajax({
		async: true,
		url: "motionControlPage/rudderAndSpeed",
		type: "GET",
		dataType: "json",
		success: function(result){
			$('#percent-thrust').val(result['motor']['value']);
			$('#rudder-angle').val(result['rudder']['value']);
		}
	});
}
