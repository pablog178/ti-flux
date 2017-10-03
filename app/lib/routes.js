/**
 * List of all the windows to be opened by the application, along with their settings to the specific window and how it must be managed
 * @class Routes
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[routes]' + '\x1b[39;49m ';

var Routes = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	// +-------------------
	// | Public members.
	// +-------------------

	return {
		login: {
			path: 'login/loginWindow'
		}
	};
})();

module.exports = Routes;