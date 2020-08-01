/**
 * Instantiable object with the common functions for a store
 * @class Utils.store
 */

const LOG_TAG = '\x1b[35m' + '[utils/store]' + '\x1b[39;49m ';

var Observer = require('/utils/observer');

var Store = function (_args) {
	// +-------------------
	// | Private members.
	// +-------------------
	/**
	 * @property {Object} [args=_args] List of defined functions to use within the store
	 */
	var args = _args || {};

	/**
	 * @property {Object} state insternal state for the store
	 */
	var state = args.initialState();

	/**
	 * @property {Object} dispatcher=args.dispatcher Dispatcher to suscribe this store against
	 */
	var dispatcher = args.dispatcher;

	/**
	 * @property {Function} reducer=args.reducer Reducer function to update the state in each action
	 */
	var reducer = args.reducer;

	/**
	 * @property {Utils.observer} observer Embedded observer object for making this store observable
	 */
	var observer = new Observer();

	/**
	 * @property {String} changeEvt='change' Name of the change event
	 */
	var changeEvt = 'change';

	/**
	 * @property {String} dispatchToken Token obtained from registering this store agains the dispatcher
	 */
	var dispatchToken = dispatcher.register(handleAction);

	/**
	 * @method handleAction
	 * @private
	 * General handler for all the actions coming from the dispatcher, updating the store if needed
	 * @param {Object} _payload Payload coming from the action to update this store
	 * @return {void}
	 */
	function handleAction(_payload) {
		doLog && console.debug(LOG_TAG, '- handleAction');

		var previousState = JSON.parse(JSON.stringify(state));

		state = _.reduce([_payload], reducer, state);

		if (!_.isEqual(previousState, state)) {
			observer.fireEvent(changeEvt, state);
		}
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method getState
	 * Returns the current state of the store
	 * @return {Object}
	 */
	function getState() {
		doLog && console.debug(LOG_TAG, '- getState');

		return state;
	}

	/**
	 * @method addListener
	 * Registers a new function to handle the changes in this store's state
	 * @param {Function} _handler Function to addListener the changes
	 * @return {String} Token to use when removing a listener
	 */
	function addListener(_handler) {
		doLog && console.debug(LOG_TAG, '- addListener');

		return observer.addListener(changeEvt, _handler);
	}

	/**
	 * @method removeListener
	 * Removes a listener function from the store
	 * @param {String} _handlerToken Token of the listener to remove
	 * @return {void}
	 */
	function removeListener(_handlerToken) {
		doLog && console.debug(LOG_TAG, '- removeListener');

		observer.removeListener(changeEvt, _handlerToken);
	}

	return {
		getState: getState,
		addListener: addListener,
		removeListener: removeListener
	};
};

module.exports = Store;
