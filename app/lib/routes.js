/**
 * List of windows to open and how to open them from appNavihgation
 * @class Routes
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[routes]' + '\x1b[39;49m ';

var Routes = {
	'loginWindow': {
		path: 'login/loginWindow',
		closeAllWindows: true
	},
	'mainWindow': {
		path: 'main/mainWindow',
		navWindow: 'mainNavigation',
		closeAllWindows: true
	}
};

module.exports = Routes;
