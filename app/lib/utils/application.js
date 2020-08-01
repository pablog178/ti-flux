/**
 * Application's main state manager
 * @class Application
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[utils/application]' + '\x1b[39;49m ';

const Navigation = require('/utils/navigation');
const Session = require('/stores/session');
const StateMachine = require('/utils/stateMachine');

var Application = (function () {
	var stateMachine;
	// +-------------------
	// | Private members.
	// +-------------------
	var states = {
		start: {
			onState: function () {
				doLog && console.debug(LOG_TAG, '- onState - start');

				Session.addListener(handleSessionChange);

				stateMachine.transitionToNextState();
			},
			transition: function () {
				doLog && console.debug(LOG_TAG, '- transition from - start');
				if (Session.isActive()) {
					return 'stable';
				}

				return 'login';
			}
		},
		login: {
			onState: function () {
				doLog && console.debug(LOG_TAG, '- onState - login');

				Session.logout();

				Navigation.open('loginWindow');
			},
			transition: function () {
				doLog && console.debug(LOG_TAG, '- transition from - login');
				if (Session.isActive()) {
					return 'stable';
				}
			}
		},
		stable: {
			onState: function () {
				doLog && console.debug(LOG_TAG, '- onState - stable');

				Navigation.open('mainWindow');
			},
			transition: function () {
				doLog && console.debug(LOG_TAG, '- transition from  - stable');
				if (!Session.isActive()) {
					return 'login';
				}
			}
		}
	};

	/**
	 * @method init
	 * @private
	 * Initialices the application library
	 * @return {void}
	 */
	function init() {
		doLog && console.debug(LOG_TAG, '- init');

		stateMachine = new StateMachine(states);
	}

	/**
	 * @method handleSessionChange
	 * @private
	 * Handles all the changes in the sessionStore, updating the state machine if needed
	 * @param {Object} _payloads param_description
	 * @return {void}
	 */
	function handleSessionChange() {
		doLog && console.debug(LOG_TAG, '- handleSessionChange');

		stateMachine.transitionToNextState();
	}

	// +-------------------
	// | Public members.
	// +-------------------

	init();

	return {
		start: stateMachine.start
	};
})();

module.exports = Application;
