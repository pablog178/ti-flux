/**
 * Defines a new container for painting/updating UI elements based multiple stores states
 * @class Utils.container
 */

const LOG_TAG = '\x1b[35m' + '[utils/container]' + '\x1b[39;49m ';

var Container = function (_args) {
	// +-------------------
	// | Private members.
	// +-------------------

	/**
	 * @property {Object} args Arguments for initialice this object
	 */
	var args = _args;

	/**
	 * @property {Object} state Internal state for this container
	 */
	var state = args.initialState ? args.initialState() : {};

	/**
	 * @property {Function} render=args.render Function to call when rendering a state's update
	 */
	var render = args.render;

	/**
	 * @property {Object[]} stores List of stores this container will interact with
	 */
	var stores = args.stores || [];

	/**
	 * @property {String[]} tokens=[] List of tokes when registering with the store, to remove then later in the cleanup of the container
	 */
	var tokens = [];

	/**
	 * @method init
	 * @private
	 * Initialices this object
	 * @return {void}
	 */
	function init() {
		doLog && console.log(LOG_TAG, '- init');

		_.each(stores, function (_store) {
			tokens.push(_store.addListener(setState));
		});
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method setState
	 * Updates the internat state of the controller, calling render if something changes
	 * @param {Object} _state New properties to update in the state
	 * @return {void}
	 */
	function setState(_state) {
		doLog && console.log(LOG_TAG, '- setState');

		var oldState = JSON.parse(JSON.stringify(state));
		var diffState = {};

		_.extend(state, _state);

		_.each(state, function (_value, _key) {
			if (!_.isEqual(state[_key], oldState[_key])) {
				diffState[_key] = _value;
			}
		});

		render(diffState);
	}

	/**
	 * @method getState
	 * Retrieves the whole state object
	 * @return {Object}
	 */
	function getState() {
		doLog && console.log(LOG_TAG, '- getState');

		return state;
	}

	/**
	 * @method destroy
	 * Removes all listeners and cleans up memory
	 * @return {void}
	 */
	function destroy() {
		doLog && console.log(LOG_TAG, '- destroy');

		_.each(stores, function (_store, _index) {
			_store.removeListener(tokens[_index]);
		});
	}

	init();

	return {
		setState: setState,
		getState: getState,
		destroy: destroy
	};
};

module.exports = Container;
