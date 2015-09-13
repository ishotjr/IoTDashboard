module.exports = function(app, io) {
	var bodyParser = require('body-parser'),
		consolePrefix = 'Device Control: ',
		requestPrefix = '/device',
		latestData = null;

	app.use(bodyParser.json());

	app.get(requestPrefix + '/data', function(request, response) {
		//
		// Code to find data from the device would be here.
		//
		if (latestData != null) {
			response.json({data: latestData});
		} else {
			response.json({error: 'Device not connected'});
		}

		console.log(consolePrefix + 'Giving data of ' + latestData);
	});

	app.post(requestPrefix + '/toggleDevice', function(request, response) {
		console.log(consolePrefix + 'Toggle device received: ' + request.body.toggle);

		// Toggle our device on/off
		response.json({success: true});
	});

	io.sockets.on('connection', function(socket) {
		console.log(consolePrefix + 'Socket io is ready.');
	});
};