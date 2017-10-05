/**
 * List of app states and how to handle them by the app
 * @class States
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[states]' + '\x1b[39;49m ';

var States = {
	'stable': {
		open: 'main',
		closeOthers: true
	},
	'unstable': {
		open: 'login',
		closeOthers: true
	}
};

module.exports = States;
