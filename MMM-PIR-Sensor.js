/* global Module */

/* Magic Mirror
* Custom version by jheyman based on :
* Module: MMM-PIR-Sensor
*
* By Paul-Vincent Roll http://paulvincentroll.com
* MIT Licensed.
*/

Module.register('MMM-PIR-Sensor',{
	requiresVersion: '2.1.0',
	defaults: {
		sensorPin: 14,
		relayPin: 15,
		powerSavingDelay: 10,
		powerSavingNotification: false,
	},

	// internal notification from node_helper
	socketNotificationReceived: function (notification, payload) {
		if (notification === 'USER_PRESENCE') {
			this.sendNotification(notification, payload)
		}
	},

	// external notification received
	notificationReceived: function (notification, payload) {
		if (notification === 'SCREEN_WAKEUP') {
			// ask node_helper to toggle display
			this.sendNotification(notification, payload)
		}
	},

	start: function () {
		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
});
