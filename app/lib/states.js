/**
 * List of app states and how to handle them by the app
 * @class States
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[states]' + '\x1b[39;49m ';

var States = {
	'stable': {
		open: 'mainWindow'
	},
	'unstable': {
		open: 'loginWindow'
	}
};

module.exports = States;
