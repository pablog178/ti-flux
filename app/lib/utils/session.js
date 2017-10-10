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
	 * @method isSessionSaved
	 * Validates if there is a session locally saved to create
	 * @return {Boolean}
	 */
	function isSessionSaved() {
		doLog && console.log(LOG_TAG, '- isSessionSaved');

		return true;
	}

	return {
		logout: logout,
		createSession: createSession,
		isSessionSaved: isSessionSaved
	};
})();

module.exports = Session;
