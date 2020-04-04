# MMM-PIR-Sensor (jheyman edition)
This a custom & minimal version of paviro's [MMM-PIR-sensor](https://github.com/paviro/MMM-PIR-Sensor) module for [MagicMirror](https://github.com/MichMich/MagicMirror). It monitors a PIR motion sensor to trigger a relay (which in my case is wired to the on/off button of a display), both being connected to GPIOs of a Raspberry Pi.

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/jheyman/MMM-PIR-Sensor`. A new folder will appear navigate into it.
2. Execute `npm install` to install the node dependencies.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
{                        
	module: 'MMM-PIR-Sensor',
	config: {
			// See 'Configuration options' for more information.
	}
}
]
````

## Configuration Options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>sensorPin</code></td>
			<td>The GPIO pin your PIR-sensor is connected to.<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>14</code>
				<br><b>Note:</b> Please use BCM-numbering.
			</td>
		</tr>
		<tr>
			<td><code>powerSavingDelay</code></td>
			<td>Timeout delay (in seconds) after which the monitor will be turned off if no user presence is detected by the PIR sensor.<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>10</code>
			</td>
		</tr>
		<tr>
			<td><code>relayPin</code></td>
			<td>The GPIO pin your relay is connected to.<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>15</code>
				<br><b>Note:</b> Please use BCM-numbering.
			</td>
		</tr>
		<tr>
			<td><code>powerSavingNotification</code></td>
			<td>To display a notification before to switch screen off<br>
				<br><b>Possible values:</b> <code>boolean</code>
				<br><b>Default value:</b> <code>false</code>
				<br><b>Note:</b> Need the default module "alert" to be declared on config.js file.
			</td>
		</tr>
		<tr>
			<td><code>powerSavingMessage</code></td>
			<td>Message notification to display before to switch screen off<br>
				<br><b>Default value:</b> <code>"Monitor will be turned off by PIR module"</code>
			</td>
		</tr>
	</tbody>
</table>

## Developer Notes
This module broadcasts a `USER_PRESENCE` notification with the payload beeing `true` or `false` you can use it to pause or disable your module.

## Dependencies
- [wiring-pi](https://www.npmjs.com/package/wiring-pi) (installed via `npm install`)

The MIT License (MIT)
=====================

Copyright © 2016 Paul-Vincent Roll

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
