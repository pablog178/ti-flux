/**
 * List of windows to open and how to open them from appNavihgation
 * @class Routes
 * @singleton
 */

var Routes = {
	loginWindow: {
		path: 'login/loginWindow',
		closeAllWindows: true
	},
	mainWindow: {
		path: 'main/mainWindow',
		navWindow: 'mainNavigation',
		closeAllWindows: true
	}
};

module.exports = Routes;
