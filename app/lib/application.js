/**
 * State Manager for the whole applciation
 * @class Application
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[application]' + '\x1b[39;49m ';

var navigation = require('navigation');

var Application = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	// +-------------------
	// | Public members.
	// +-------------------

	function start() {
		navigation.open('login');
	}

	return {
		start: start
	};
})();

module.exports = Application;