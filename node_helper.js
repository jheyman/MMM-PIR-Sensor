'use strict';

/* Magic Mirror
* Custom version by jheyman based on :
* Module: MMM-PIR-Sensor
*
* By Paul-Vincent Roll http://paulvincentroll.com
* MIT Licensed.
*/

const NodeHelper = require('node_helper');
const Gpio = require('onoff').Gpio;
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
    start: function () {
        this.started = false;
    },

    // Toggle the relay connected to the physical on/off button on the monitor front side
    // Normal/manual use is a single push on the button, so emulate that with 100ms activation of the relay
    pushMonitorOnOffButton: function () {
        var self = this;
        if (this.config.relayPin !== false) {
            console.log("trig relay");
            self.relay.writeSync(1);
            setTimeout(function(){
                    self.relay.writeSync(0);
            }, 100);
        }
    },

    // notification from main app
    socketNotificationReceived: function (notification, payload) {
        if (notification === 'CONFIG' && this.started == false) {
            const self = this;
            this.config = payload;
            // the module assumes that it will launched with display turned OFF.
            let displayOn = false;
            console.log("display OFF");

            // Setup for relay pin
            this.relay = new Gpio(this.config.relayPin, 'out');
            this.relay.writeSync(0);

            // Setup for sensor pin : detect rising edge only, we only care about detecting start of
            // user presence, the absence is managed by a timeout.
            this.pir = new Gpio(this.config.sensorPin, 'in', 'rising');

            // Declare callback for PIR detection events
            this.pir.watch(function (err, value) {
                console.log("PIR detected user presence")
                // First time user presence is detected after the previous timeout/sleep period, turn screen on
                if (!displayOn) { 
                    self.sendSocketNotification('USER_PRESENCE', true);
                    self.pushMonitorOnOffButton();
                    displayOn = true;
                    console.log("display ON")
                } else {
                    console.log("PIR triggered but screen already ON, ignoring");
                }                    

                // (re)-start display timeout timer
                clearTimeout(self.deactivateMonitorTimeout);
                self.deactivateMonitorTimeout = setTimeout(function() {
                    self.pushMonitorOnOffButton();
                    displayOn = false;
                    console.log("display OFF");
                    self.sendSocketNotification('USER_PRESENCE', false);
                }, self.config.powerSavingDelay * 1000);     
            });

            this.started = true;

        } else if (notification === 'SCREEN_WAKEUP') {
            this.pushMonitorOnOffButton();
        }
    }

});
