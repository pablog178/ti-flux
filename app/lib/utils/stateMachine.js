/**
 * Generic state manager to be used with a separate list of states
 * @class Utils.stateMachine
 */

const LOG_TAG = '\x1b[35m' + '[utils/stateMachine]' + '\x1b[39;49m ';

var StateMachine = function (_states) {
	// +-------------------
	// | Private members.
	// +-------------------

	/**
	 * @property {Object} states List of states to be managed by the machine
	 */
	var states = _states || {};

	/**
	 * @property {String} currentState=null Name of the current state the machine is in
	 */
	var currentState = null;

	/**
	 * @method gotoState
	 * @private
	 * Moves to the given state
	 * @param {String} _stateName Name of the state to move
	 * @param {Object} [_options] Options to call the state with
	 * @return {void}
	 */
	function gotoState(_stateName, _options) {
		doLog && console.log(LOG_TAG, '- gotoState');

		var state = states[_stateName];

		if (!state) {
			throw Error('state not defined: ' + _stateName);
		}

		if (!state.onState) {
			throw Error('state.onState() function not defined: ' + _stateName);
		}

		currentState = _stateName;
		state.onState(_options, transitionToNextState);
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method start
	 * Start the application, navigate through the state machine to reach the Main Window.
	 * @return {void}
	 */
	function start(_options) {
		doLog && console.log(LOG_TAG, '- start');

		gotoState('start', _options);
	}

	/**
	 * @method transitionToNextState
	 * Forces the state machine to advance to the next state, based on the current state's transition logic
	 * @param {Object} _options Options to transition to the next state
	 * @return {void}
	 */
	function transitionToNextState(_options) {
		doLog && console.log(LOG_TAG, '- transitionToNextState');
		
		var state = states[currentState];

		if (!state.transition) {
			throw Error('state.transition() function not defined: ' + currentState);
		}

		var nextState = state.transition(_options);

		if (nextState) {
			gotoState(nextState, _options);
		}
	}

	return {
		start: start,
		transitionToNextState: transitionToNextState
	};
};

module.exports = StateMachine;
