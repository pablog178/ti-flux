/**
 * Manager for the session of the app
 * @class Session
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[session]' + '\x1b[39;49m ';

var Session = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method logout
	 * Closes the current session
	 * @return {void}
	 */
	function logout() {
		doLog && console.log(LOG_TAG, '- logout');

		//Do Something
	}

	/**
	 * @method createSession
	 * Generates a new session and saves its data
	 * @return {void}
	 */
	function createSession() {
		doLog && console.log(LOG_TAG, '- createSession');

		//Do Something
	}

	/**
	 * @method isActive
	 * Validates if there is a session locally saved to create
	 * @return {Boolean}
	 */
	function isActive() {
		doLog && console.log(LOG_TAG, '- isActive');

		return false;
	}

	return {
		logout: logout,
		createSession: createSession,
		isActive: isActive
	};
})();

module.exports = Session;
