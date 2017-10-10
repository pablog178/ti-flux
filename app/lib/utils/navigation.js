/**
 * Container for openning and closing screens within the app
 * @class Navigation
 * @singleton
 */
const LOG_TAG = '\x1b[35m' + '[navigation]' + '\x1b[39;49m ';

var routes = require('routes');

var Navigation = (function () {
	// +-------------------
	// | Private members.
	// +-------------------
	var controllers = {};
	var navigationWindows = {};

	/**
	 * @method openWindowInNavWindow
	 * @private
	 * Opens a given window into a navigationWindow (iOS) or just opens the window normally (android)
	 * @param {Ti.UI.Window} _window Window to open
	 * @param {String} _navName Name of the navigationWindow to open the window in
	 * @return {void}
	 */
	function openWindowInNavWindow(_window, _navName) {
		doLog && console.log(LOG_TAG, '- openWindowInNavWindow');

		if (OS_ANDROID) {
			_window.open();
		}

		if (OS_IOS) {
			var navWindow = navigationWindows[_navName];

			if (!navWindow) {
				navWindow = Ti.UI.iOS.createNavigationWindow({
					window: _window
				});
				navigationWindows[_navName] = navWindow;

				navWindow.open();
			} else {
				navWindow.openWindow(_window);
			}

		}
	}

	/**
	 * @method closeWindowInNavWindow
	 * @private
	 * Closes a given window from the navigation specified (iOS) or just closes the window
	 * @param {Ti.UI.Window} _window Window to close
	 * @param {String} _navName Name of the navigation to close the window from
	 * @return {void}
	 */
	function closeWindowInNavWindow(_window, _navName) {
		doLog && console.log(LOG_TAG, '- closeWindowInNavWindow');

		if (OS_ANDROID) {
			_window.close();
		}

		if (OS_IOS) {
			var navWindow = navigationWindows[_navName];

			if (navWindow.window === _window) {
				navWindow.close();

				delete navigationWindows[_navName];
			} else {
				navWindow.closeWindow(_window);
			}

		}
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method open
	 * Opens a new window, based on the initial routes given
	 * @param {String} _routeName Route to load (open)
	 * @param {Object} _options Options to load the window with
	 * @return {void}
	 */
	function open(_routeName, _options) {
		doLog && console.log(LOG_TAG, '- open: ' + _routeName);

		var route = routes[_routeName];
		var options = _options || {};
		var controller = null;
		var navWindow = null;
		var path = null;
		var modal = false;
		var closeAllWindows = route.closeAllWindows || false;

		if (!route) {
			throw Error('route not defined: ' + _routeName);
		}

		if (controllers[_routeName]) {
			doLog && console.warn(LOG_TAG, '- Window already opened, open() will skip: ' + _routeName);
			return false;
		}

		path = route.path || null;

		if (!path) {
			throw Error('route.path not defined for : ' + _routeName);
		}

		controller = Alloy.createController(route.path, options);
		navWindow = route.navWindow || null;
		modal = route.modal || false;

		if (!controller.window) {
			throw Error('controller does not define a top-level window: ' + _routeName);
		}

		controllers[_routeName] = controller;

		if (navWindow) {
			openWindowInNavWindow(controller.window, navWindow);
		} else {
			controller.window.open({
				modal: modal
			});
		}

		route.onOpen && route.onOpen(options);

		if (closeAllWindows) {
			_.each(controllers, function (_controller, _controllerName) {
				if (_controllerName !== _routeName) {
					close(_controllerName);
				}
			});
		}
	}

	/**
	 * @method close
	 * Closes a given window by its route name, if found
	 * @param {String} _routeName Window's route to close
	 * @param {Object} _options Options to send for closing the window
	 * @return {void}
	 */
	function close(_routeName, _options) {
		doLog && console.log(LOG_TAG, '- close: ' + _routeName);

		var route = routes[_routeName];
		var options = _options || {};
		var controller = controllers[_routeName];
		var navWindow = null;

		if (!route) {
			throw Error('route not defined in routes: ' + _routeName);
		}

		if (!controller) {
			doLog && console.log(LOG_TAG, '- close - controller for route not found: ' + _routeName);
			return false;
		}

		if (!controller.window) {
			throw Error('controller does not define a top-level window: ' + _routeName);
		}

		navWindow = route.navWindow || null;

		if (navWindow) {
			closeWindowInNavWindow(controller.window, navWindow);
		} else {
			controller.window.close();
		}

		route.onClose && route.onClose(options);
	}

	return {
		open: open,
		close: close
	};
})();

module.exports = Navigation;
