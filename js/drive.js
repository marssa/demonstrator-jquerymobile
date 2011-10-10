function drive(){
	
	var t;
	
	$("#move-forward").live('vmousedown', function(event) {
		$.getJSON("motor/speed/increase");
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
		$.getJSON("motor/speed/decrease");
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
		$.getJSON("rudder/rotate/true");
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
		$.getJSON("rudder/rotate/false");
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
		$.getJSON("http://localhost:8182/motor/speed/0");
		removeHighLight('stop-button');
		showHighLight('stop-button-hl');
		
		t=setTimeout("removeHighLight('stop-button-hl');",200);
		t=setTimeout("showHighLight('stop-button');",200);
	});	
	
	$("#full-astern").live('vclick', function(event) {		
		$.getJSON("motor/speed/-100");
	
	});
	
	$("#full-ahead").live('vclick', function(event) {		
		$.getJSON("motor/speed/100");

	});	
}


function decreaseSpeed(){
	$.getJSON("motor/speed/decrease");
}

function increaseSpeed(){
	$.getJSON("motor/speed/increase");
}

function stop(){
	$.getJSON("motor/speed/0");
}
function turnSB(){
	$.getJSON("rudder/rotate/true");
}
function turnPS(){
	$.getJSON("rudder/rotate/false");
}

function currentSpeed(){
//var a =	$.getJSON("http://localhost:8182/motor/speed");
//	alert('test');
//
	a = $.getJSON("http://localhost:8182/motor/speed");
	$.parseJSON(a);
	
	alert(a);
	//$('#percent-thrust').value = a['responsetext'];
	
	
/*	$.ajax({
        async: false,
        type: "POST",
        url: "http://localhost:8182/motor/speed",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        success: function (result) {
        	//jQuery.parseJSON(result.d);
        	alert(jQuery.parseJSON(result.d));
        },
        error: AjaxFailed
    });
	*/
	
}
