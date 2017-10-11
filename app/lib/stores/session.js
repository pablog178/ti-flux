/**
 * Singleton for the session's store
 * @class Stores.session
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[stores/session]' + '\x1b[39;49m ';

var Store = require('/utils/store');
var Dispatcher = require('/utils/dispatcher');

var Session = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	var store = new Store({
		dispatcher: Dispatcher,
		initialState: initialState,
		reducer: reduce
	});

	/**
	 * @method initialState
	 * Initialices this store's state
	 * @return {Object}
	 */
	function initialState() {
		doLog && console.log(LOG_TAG, '- initialState');

		return {
			active: false
		};
	}

	/**
	 * @method reduce
	 * @private
	 * Reduces the payload(s) from the dispatcher to update the store
	 * @param {Object} _payload Payload received to the store
	 * @return {Object} new Store to use after each iteration
	 */
	function reduce(_state, _action) {
		doLog && console.log(LOG_TAG, '- reduce');

		switch (_action.type) {
		case 'SESSION_LOGOUT':
			return {
				active: false
			};
		case 'SESSION_LOGIN':
			return {
				active: true,
				loading: false,
				username: _action.username
			};
		case 'SESSION_ERROR':
			return {
				active: false,
				loading: false,
				errorMessage: _action.errorMessage
			};
		case 'SESSION_TRY_LOGIN':
			return {
				active: false,
				loading: true
			};
		default:
			return _state;

		}
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method isActive
	 * Determines if there is a valid session in the store
	 * @return {Boolean}
	 */
	function isActive() {
		doLog && console.log(LOG_TAG, '- isActive');

		var state = store.getState();

		return !!state.active;
	}

	/**
	 * @method login
	 * Attempts a to login with the given credentials
	 * @param {String} _username Username to loin with
	 * @param {String} _password Password to login with
	 * @return {void}
	 */
	function login(_username, _password) {
		doLog && console.log(LOG_TAG, '- login');

		Dispatcher.dispatch({
			type: 'SESSION_TRY_LOGIN'
		});

		_.delay(function () {
			if (true) {
				Dispatcher.dispatch({
					type: 'SESSION_ERROR',
					errorMessage: 'An error has occured, try again'
				});
			} else {
				Dispatcher.dispatch({
					type: 'SESSION_LOGIN',
					username: _username
				});
			}
		}, 5000);
	}

	/**
	 * @method logout
	 * Forces the session to end
	 * @return {void}
	 */
	function logout() {
		doLog && console.log(LOG_TAG, '- logout');

		Dispatcher.dispatch({
			type: 'SESSION_LOGOUT'
		});
	}

	return _.extend({}, store, {
		isActive: isActive,
		login: login,
		logout: logout
	});
})();

module.exports = Session;
