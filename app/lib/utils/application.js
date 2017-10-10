/**
 * Application's main state manager
 * @class Application
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[utils/application]' + '\x1b[39;49m ';

const Navigation = require('/utils/navigation');
const Session = require('/utils/session');
const StateMachine = require('/utils/stateMachine');

var Application = (function () {
	// +-------------------
	// | Private members.
	// +-------------------
	var states = {
		'start': {
			onState: function(_options, _onComplete) {
				doLog && console.log(LOG_TAG, '- onState - start');

				_onComplete();
			},
			transition: function() {
				doLog && console.log(LOG_TAG, '- transition from - start');
				if (Session.isActive()) {
					return 'stable';
				}

				return 'login';
			}
		},
		'login': {
			onState: function(_options, _onComplete) {
				doLog && console.log(LOG_TAG, '- onState - login');

				Session.logout();
				
				Navigation.open('loginWindow');
			},
			transition: function() {
				doLog && console.log(LOG_TAG, '- transition from - login');
				if (Session.isActive()) {
					return 'stable';
				}
			}
		},
		'stable': {
			onState: function(_options, _onComplete) {
				doLog && console.log(LOG_TAG, '- onState - stable');

				Navigation.open('mainWindow');
			},
			transition: function() {
				doLog && console.log(LOG_TAG, '- transition from  - stable');
				if (!Session.isActive()) {
					return 'login';
				}
			}
		}
	};

	stateMachine = new StateMachine(states);

	return {
		start: stateMachine.start
	}
})();

module.exports = Application;
