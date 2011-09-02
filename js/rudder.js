//rudder gauge

          dojo.require("dojox.widget.AnalogGauge");
            dojo.require("dojox.widget.gauge.AnalogArcIndicator");
            dojo.require("dojox.widget.gauge.AnalogNeedleIndicator");

            dojo.addOnLoad(function() {
                var gauge = dijit.byId('rudder-indicator');
                // Used for a gradient arc indicator below:
                var fill = {
                    'type': 'linear',
                    'x1': 50,
                    'y1': 50,
                    'x2': 350,
                    'y2': 350,
                    'colors': [{
                        offset: 0,
                        color: 'black'
                    },
                    {
                        offset: 0.5,
                        color: 'black'
                    },
                    {
                        offset: 0.75,
                        color: 'yellow'
                    },
                    {
                        offset: 1,
                        color: 'red'
                    }]
                };
                gauge.addIndicator(new dojox.widget.gauge.AnalogArcIndicator({
                    'value': 200,
                    'width': 20,
                    'offset': 150,
                    'color': fill,
                    'noChange': true,
                    'hideValues': true
                }));
                gauge.addIndicator(new dojox.widget.gauge.AnalogArcIndicator({
                    'value': 80,
                    'width': 10,
                    'offset': 150,
                    'color': 'blue',
                    'title': 'Arc',
                    'hover': 'Arc: 80'
                }));
                gauge.addIndicator(new dojox.widget.gauge.AnalogNeedleIndicator({
                    'value': 100,
                    'width': 8,
                    'length': 150,
                    'color': 'red',
                    'title': 'Needle',
                    'hover': 'Needle: 100'
                }));
            });