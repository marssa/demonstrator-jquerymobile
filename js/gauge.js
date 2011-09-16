			
var gauge;

function showgauge(){
	gauge = bindows.loadGaugeIntoDiv("gauge.xml", "gaugeDiv");
	
	
}

function setGaugeValue(value){
	gauge.needle.setValue(value);
	
	
}