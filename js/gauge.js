			
var gauge;

function showGauge(){
	gauge = bindows.loadGaugeIntoDiv("gauge.xml", "gaugeDiv");
	
	
}

function setGaugeValue(value){
	gauge.needle.setValue(value);
	
	
}