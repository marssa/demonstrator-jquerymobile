function drive(){
	
	var t;
	
	$("#move-forward").live('vmousedown', function(event) {
		$.ajax({  
			  url: 'motor/increaseSpeed',  
			  dataType: 'json',  
			  data: data,  
			  async: true
			});  
		
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
		
		$.ajax({  
			  url: 'motor/decreaseSpeed',  
			  dataType: 'json',  
			  data: data,  
			  async: true
		});  
		
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
		
		$.ajax({  
			  url: 'rudder/rotateMore/true',  
			  dataType: 'json',  
			  data: data,  
			  async: true
			});  
		
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
			
		$.ajax({  
			  url: "rudder/rotateMore/false",  
			  dataType: "json",  
			  data: data,  
			  async: true
		}); 
		
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
		
		$.ajax({  
			  url: "motor/speed/0",  
			  dataType: "json",  
			  data: data,  
			  async: true
		}); 
		
		removeHighLight('stop-button');
		showHighLight('stop-button-hl');
		t=setTimeout("removeHighLight('stop-button-hl');",200);
		t=setTimeout("showHighLight('stop-button');",200);
	});	
	
	$("#full-astern").live('vclick', function(event) {		

		$.ajax({  
			  url: "motor/speed/-100",  
			  dataType: "json",  
			  data: data,  
			  async: true
		}); 

	});
	
	$("#full-ahead").live('vclick', function(event) {		
		
		$.ajax({  
			  url: "motor/speed/100",  
			  dataType: "json",  
			  data: data,  
			  async: true
		}); 

	});	
}

function decreaseSpeed(){
	
	$.ajax({  
		  url: "motor/speed/decrease",  
		  dataType: "json",  
		  data: data,  
		  async: true
	}); 
}

function increaseSpeed(){

	$.ajax({  
		  url: "motor/speed/increase",  
		  dataType: "json",  
		  data: data,  
		  async: true
	}); 
}

function stop(){

	$.ajax({  
		  url: "motor/speed/0",  
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


}
