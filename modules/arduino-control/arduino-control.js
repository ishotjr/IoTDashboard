module.exports = function(app, io) {
	var bodyParser = require('body-parser'),
		consolePrefix = 'Arduino Control: ',
		requestPrefix = '/arduino',
		five = require('johnny-five'),
		board = new five.Board(),
		tempSensor,
		latestTempLevel = null;

	app.use(bodyParser.json());

	board.on('ready', function() {
		console.log(consolePrefix + 'Board ready');
		tempSensor = new five.Sensor({
			pin: 'A4',
			freq: 250
		});

		tempSensor.on('read', function(err, value){
			var temp = (((value * 0.004882814) - 0.5) * 100).toFixed(1);
			console.log(consolePrefix + 'Temp is ' + temp);
			latestTempLevel = temp;

			io.sockets.emit('roomTempReturned', temp);
		});
	});
	console.log('\n' + consolePrefix + 'Waiting for device to connect...');

	app.get(requestPrefix + '/tempLevel', function(request, response) {
		if (latestTempLevel != null) {
			response.json({roomTempLevel: latestTempLevel});
		} else {
			response.json({error: 'Device not connected'});
		}

		console.log(consolePrefix + 'Giving temp level of ' + latestTempLevel);
	});

	io.sockets.on('connection', function(socket) {
		console.log(consolePrefix + 'Socket io is ready.');
	});
};