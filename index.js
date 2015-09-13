/* ------------------------------------------------------
 * 
 *  IoT Dashboard
 *
 * ------------------------------------------------------ */

var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server),
	bodyParser = require('body-parser'),
	port = 5000,
	consolePrefix = 'Server: ';

/* ---------------------------------------------------
 *  Required Server Stuff
 * --------------------------------------------------- */
// Parse application/json requests
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

/* ---------------------------------------------------
 *  Modules
 * --------------------------------------------------- */
var arduinoControl = require('./modules/arduino-control/arduino-control.js');
arduinoControl(app, io);

/* ---------------------------------------------------
 *  Global routing
 * --------------------------------------------------- */
io.sockets.on('connection', function(socket) {
	console.log(consolePrefix + 'Socket io is connected.');
});

/* ---------------------------------------------------
 *  Start our server
 * --------------------------------------------------- */
server.listen(port, function() {
  console.log(consolePrefix + 'Listening on ' + port);
});