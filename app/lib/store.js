/**
 * Contains the whole description of the app as a simple json structure
 * @class Store
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[store]' + '\x1b[39;49m ';

var Store = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	const initialState = {
		user: {
			isLoggedIn: false
		}
	};

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method getInitialState
	 * Obtains a copy of the the app's initial state
	 * @return {Object}
	 */
	function getInitialState() {
		doLog && console.log(LOG_TAG, '- getInitialState');
		
		return JSON.parse(JSON.stringify(initialState));
	}

	return {
		getInitialState: getInitialState
	};
})();

module.exports = Store;