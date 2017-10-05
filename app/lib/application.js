/**
 * Application's main state manager
 * @class Application
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[application]' + '\x1b[39;49m ';

const navigation = require('navigation');
const session = require('session');
const states = require('states');

var Application = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	/**
	 * @method gotoState
	 * @private
	 * Moves to the given state
	 * @param {String} _stateName Name of the state to move
	 * @param {Function} _onStateComplete Callback called after the state completes
	 * @return {void}
	 */
	function gotoState(_stateName, _onStateComplete) {
		doLog && console.log(LOG_TAG, '- gotoState');

		var state = states[_stateName] || {};

		if (state.handler) {
			state.handler(_onStateComplete);
		} else if (state.open) {
			navigation.open(state.open, {
				onComplete: _onStateComplete,
				closeOthers: state.closeOthers
			});
		} else {
			doLog && console.log(LOG_TAG, '- gotoState - state with no custom step (skipping): ' + _stateName);
			_onStateComplete();
		}
	}

	/**
	 * @method transitionToUnstableState
	 * @private
	 * Process to follow to move to an unstable state
	 * @return {void}
	 */
	function transitionToUnstableState() {
		doLog && console.log(LOG_TAG, '- transitionToUnstableState');

		session.logout();
		gotoState('unstable', handleUnstableComplete);
	}

	/**
	 * @method transitionToStableState
	 * @private
	 * Process to follow to move to the stable state
	 * @return {void}
	 */
	function transitionToStableState() {
		doLog && console.log(LOG_TAG, '- transitionToStableState');

		initStates();
		gotoState('stable');
	}

	/**
	 * @method initStates
	 * @private
	 * Initialize states
	 * @return {void}
	 */
	function initStates() {
		doLog && console.log(LOG_TAG, '- initStates');

		// telemetry.track();
	}

	/**
	 * @method handleStartComplete
	 * @private
	 * Function called once the splash window closes
	 * @param {Object} _error Error object if something wrong happens
	 * @return {void}
	 */
	function handleStartComplete(_error) {
		doLog && console.log(LOG_TAG, '- handleStartComplete');

		if (_error) {
			doLog && console.error(LOG_TAG, '- handleStartComplete - an error occured:' + JSON.stringify(_error));
			return false;
		}

		var isLoggedIn = session.isSessionSaved() && session.createSession();
		if (!isLoggedIn) {
			transitionToUnstableState();
		} else {
			transitionToStableState();
		}
	}

	/**
	 * @method handleUnstableComplete
	 * @private
	 * Function handler once the unstable state has completed
	 * @param {Object} _error Error object if something wrong happens
	 * @return {void}
	 */
	function handleUnstableComplete(_error) {
		doLog && console.log(LOG_TAG, '- handleUnstableComplete');

		if (_error) {
			doLog && console.error(LOG_TAG, '- handleUnstableComplete - an error occured:' + JSON.stringify(_error));
			return false;
		}

		transitionToStableState();
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method start
	 * Start the application, navigate through the state machine to reach the Main Window.
	 * @return {void}
	 */
	function start() {
		doLog && console.log(LOG_TAG, '- start');

		gotoState('start', handleStartComplete);
	}

	/**
	 * @method logout
	 * Logout
	 * @return {void}
	 */
	function logout() {
		doLog && console.log(LOG_TAG, '- logout');

		transitionToUnstableState();
	}

	return {
		start: start,
		logout: logout
	};
})();

module.exports = Application;
