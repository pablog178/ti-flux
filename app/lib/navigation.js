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
	var containers = {};
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
		var container = null;
		var navigation = null;
		var modal = false;
		var closeOthers = options.closeOthers || false;

		if (!route) {
			throw Error('route not defined: ' + _routeName);
		}

		if (containers[_routeName]) {
			doLog && console.warn(LOG_TAG, '- Window already opened, open() will skip: ' + _routeName);
			return false;
		}

		container = require('containers/' + route)(options);
		navigation = container.navigation || null;
		modal = container.modal || false;

		if (!container) {
			throw Error('Lib does not exist: lib/containers/' + route);
		}

		if (!container.window) {
			throw Error('Container does not define a top-level window: ' + _routeName);
		}

		containers[_routeName] = container;

		if (navigation) {
			openWindowInNavWindow(container.window, navigation);
		} else {
			container.window.open({
				modal: modal
			});
		}

		container.onOpen && container.onOpen(options);

		if (closeOthers) {
			_.each(containers, function (_container, _containerName) {
				if (_containerName !== _routeName) {
					close(_containerName);
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
		var container = containers[_routeName];
		var navigation = null;

		if (!route) {
			throw Error('route not defined in routes: ' + _routeName);
		}

		if (!container) {
			doLog && console.log(LOG_TAG, '- close - container for route not found: ' + _routeName);
			return false;
		}

		if (!container.window) {
			throw Error('container does not define a top-level window: ' + _routeName);
		}

		navigation = container.navigation || null;

		if (navigation) {
			closeWindowInNavWindow(container.window, navigation);
		} else {
			container.window.close();
		}

		container.onClose && container.onClose(options);
	}

	return {
		open: open,
		close: close
	};
})();

module.exports = Navigation;
