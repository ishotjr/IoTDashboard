/* ------------------------------------------------------
 * 
 *  IoT Dashboard - Client side
 *
 * ------------------------------------------------------ */

var _ = require('underscore'),
	io = require('socket.io-client'),
	socket = io.connect(window.location.hostname),
	$ = require('jquery'),
	roomTempClient = require('./modules/room-temp-client.js');