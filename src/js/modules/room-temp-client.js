/* ------------------------------------------------------
 * 
 *  IoT Dashboard - Room Temperature client
 *
 * ------------------------------------------------------ */

var io = require('socket.io-client'),
	sockets = io.connect(window.location.hostname),
	$ = require('jquery'),
	common = require('./common.js'),
	$roomTempContainer,
	$roomTemp,
	tempState;

(function($) {
	$('.dashboard').append(
		'<div class="module module--room-temperature">' +
			'<h2 class="module__title">Room Temp</h2>' +
			'<div class="module__content">' +
				'<div class="thermometer">' +
					'<div class="thermometer__temp" id="room-temperature"></div>' +
				'</div><!-- thermometer -->' +
			'</div><!-- module__content -->' +
		'</div><!-- module -->');

	$roomTempContainer = $('.module--room-temperature');
	$roomTemp = $('#room-temperature');
})($, sockets);

sockets.on('roomTempReturned', function(temp) {
	common.setModuleToLoaded($roomTempContainer);
	//console.log('Temperature returned: ' + temp);
	$roomTemp.html(temp+'\xB0');

	if (temp < 20 && tempState != 'cold') {
		tempState = 'cold';
		$roomTempContainer.removeClass(function (index, css) {
		    return (css.match (/(^|\s)is-\S+/g) || []).join(' ');
		}).addClass('is-cold');
	} else if (temp >= 20 && temp < 30 && tempState != 'comfy') {
		tempState = 'comfy';
		$roomTempContainer.removeClass(function (index, css) {
		    return (css.match (/(^|\s)is-\S+/g) || []).join(' ');
		}).addClass('is-comfy');
	} else if (temp >= 30 && tempState != 'hot') {
		tempState = 'hot';
		$roomTempContainer.removeClass(function (index, css) {
		    return (css.match (/(^|\s)is-\S+/g) || []).join(' ');
		}).addClass('is-hot');
	}
});