/**
 * Singleton dispatcher for managin all the actions in the app
 * @class Utils.dispatcher
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[utils/dispatcher]' + '\x1b[39;49m ';

var Dispatcher = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	/**
	 * @property {Function[]} actionHandlers List of functions to call when a new payload comes in
	 */
	var actionHandlers = {};

	/**
	 * @property {Number} actionHandlersCount=0 Counter for the action handler registered
	 */
	var actionHandlersCount = 0;

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method register
	 * Adds a new handler for the actions to dispatch
	 * @param {Function} _handler Function to register
	 * @return {String}
	 */
	function register(_handler) {
		doLog && console.debug(LOG_TAG, '- register');

		var token = '' + actionHandlersCount;

		actionHandlers[token] = _handler;

		actionHandlersCount++;

		return token;
	}

	/**
	 * @method unregister
	 * Removes a previously registered function by its token
	 * @param {String} _token Token of the handler to remove
	 * @return {void}
	 */
	function unregister(_token) {
		doLog && console.debug(LOG_TAG, '- unregister');

		delete actionHandlers[_token];
	}

	/**
	 * @method dispatch
	 * Triggers a new action to all the registered handlers
	 * @param {Object} _payload Payload to send to all stores
	 * @return {void}
	 */
	function dispatch(_payload) {
		doLog && console.debug(LOG_TAG, '- dispatch');

		_.each(actionHandlers, function (_handler) {
			_handler(_payload);
		});
	}

	return {
		register: register,
		unregister: unregister,
		dispatch: dispatch
	};
})();

module.exports = Dispatcher;
