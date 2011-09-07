//rudder gauge


	function rudderAngleIndicator(){
          dojo.require("dojox.widget.AnalogGauge");
            dojo.require("dojox.widget.gauge.AnalogArcIndicator");
            dojo.require("dojox.widget.gauge.AnalogNeedleIndicator");

            dojo.addOnLoad(function() {
                var gauge = dijit.byId('rudder-indicator');
                // Used for a gradient arc indicator below:
               
                                         
                gauge.addIndicator(new dojox.widget.gauge.AnalogArcIndicator({
                    'value': 50,
                    'width': 10,
                    'offset': 150,
                    'color': 'green',
                    'title': 'Arc',
                    'hover': 'Arc: 80'
                    
                }));
                
                gauge.addIndicator(new dojox.widget.gauge.AnalogArcIndicator({
                    'value': 0,
                    'width': 10,
                    'offset': 150,
                    'color': 'red',
                    'title': 'Arc',
                    'hover': 'Arc: 80'
                }));
                
                gauge.addIndicator(new dojox.widget.gauge.AnalogNeedleIndicator({
                    'value':0,
                    'width': 8,
                    'length': 150,
                    'color': 'white',
                    'title': 'Needle',
                    'hover': 'Needle: 100'
                }));
               
            
            });
	}
