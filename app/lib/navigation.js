/**
 * Manager for opening and closing all the windows within the app
 * @class Navigation
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[navigation]' + '\x1b[39;49m ';

var routes = require('routes');

var Navigation = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method open
	 * Opens a new window for `_id`, based on `id`s settings defined in app/lib/routes
	 * @param {String} _id Window id to open
	 * @return {void}
	 */
	function open(_id, _options) {
		doLog && console.log(LOG_TAG, '- open');
		
		var windowSettings = routes[_id];
		var windowController = null;

		if (!windowSettings) {
			throw new Error('Window with id: ' + _id + ' is not defined in app/lib/routes');
		}

		windowController = Alloy.createController(windowSettings.path, _options);

		windowController.window.open();
	}

	return {
		open: open
	};
})();

module.exports = Navigation;