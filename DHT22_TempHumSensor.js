///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Name          : Sowmya Ramakrishnan
//NodeJS Version: 10.11.0
//References    :  1) https://github.com/momenso/node-dht-sensor
//                 2) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
//                 3) https://www.w3schools.com/js
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Calling sensor and sleep libraries for use
var sensor = require('node-dht-sensor');
var sleep = require('sleep');

// Arrays to store temperature and humidity values
var temperaturearray = new Array();
var humidityarray = new Array();

// Initial Values
var temperaturesum = 0;
var humiditysum = 0;
var i = 0;

// Function to read values 
var input = setInterval(function() {
sensor.read(22, 4, function(err, temperature, humidity) {
    if (!err) {
		// Read values, convert appropriately and store in array
		temperaturearray[i] = ((temperature*(9/5)+32).toFixed(1));
		humidityarray[i] = humidity.toFixed(1);
		// Sum values by adding with previous value
		temperaturesum = (temperaturesum + +temperaturearray[i]);
		humiditysum = (humiditysum + +humidityarray[i]);
		// Print values
		console.log( i+1 + ' -' + ' Temp ' + temperaturearray[i] + ' degF, ' + humidityarray[i] + '% Hum');     
		i++;
		// 1 second sleep-time between reading and printing values
		sleep.sleep(1);
	
		if (i == 10) {
			//Print lowest, highest, average values and re-initialize variables to zero
			console.log('Lowest Temp ' + Math.min(...temperaturearray) + ' degF');
			console.log('Lowest Hum ' + Math.min(...humidityarray) + ' %');
			console.log('Highest Temp ' + Math.max(...temperaturearray) + ' degF');
			console.log('Highest Hum ' + Math.max(...humidityarray) + ' %');
			console.log('Average Temp ' + (temperaturesum/temperaturearray.length).toFixed(1) + ' degF');
			console.log('Average Hum ' + (humiditysum/humidityarray.length).toFixed(1) + '%');
			i=0;
			temperaturesum = 0;
			humiditysum = 0;
		}
	}
});
});
