/**
 * App configuration and settings
 * Note: Packaged as a self calling function to prevent load the global scope with this variables
 * This is the first file that the app will execute.
 * @ignore
 */

// These are global variables that we don't want to import on every file
// Any addition here should be discuss with the architect before!!
global.doLog = true;
global.doTest = true;
global.moment = require('alloy/moment');

(function () {
	// App Settings
	var appId = Ti.App.id;
	var appName = Ti.App.name;
	var appVersion = Ti.App.version;
	var versionMajor = parseInt(Ti.Platform.version.split('.')[0], 10);
	var versionMinor = parseInt(Ti.Platform.version.split('.')[1], 10);
	var osVersion = Ti.Platform.version;
	var osName = Ti.Platform.osname;
	var deviceModel = Ti.Platform.model;
	var deviceManufacturer = Ti.Platform.manufacturer;

	// Simulator / Debug settings
	var isSimulator = true;

	// Define Alloy.Globals
	Alloy.Globals = {
		// App Settings
		appId: appId,
		appName: appName,
		appVersion: appVersion,
		versionMajor: versionMajor,
		versionMinor: versionMinor,
		osVersion: osVersion,
		osName: osName,
		deviceModel: deviceModel,
		deviceManufacturer: deviceManufacturer,
		isSimulator: isSimulator,
		device: {
			width: null,
			height: null,
			dpi: Ti.Platform.displayCaps.dpi,
			density: Ti.Platform.displayCaps.density,
			orientation:
				Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT ||
				Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT
					? 'landscape'
					: 'portrait'
		},

		// Keep track of some controllers for navigation.
		mainContainerView: null,
		mainNavController: null,
		defaultSelectedRadioButton: null,

		// Database properties
		databaseName: 'databaseName',
		databaseVersion: 1,

		// Color names source: http://chir.ag/projects/name-that-color/
		colors: {
			white: '#ffffff',
			black: '#000000',
			transparent: 'transparent',
			mineShaft: '#292929',
			silver: '#CCCCCC',
			silverDark: '#BABABA',
			flamingo: '#EB5E36',
			guardsmanRed: '#D60000'
		}
	};

	if (OS_IOS) {
		Alloy.Globals.fonts = {
			primary: {
				regular: 'HelveticaNeue',
				light: 'HelveticaNeue-Light',
				bold: 'HelveticaNeue-Bold',
				boldItalic: 'HelveticaNeue-BoldItalic',
				medium: 'HelveticaNeue-Medium',
				condensedBold: 'HelveticaNeue-CondensedBold'
			}
		};
	}
	if (OS_ANDROID) {
		Alloy.Globals.fonts = {
			primary: {
				regular: 'Roboto-Regular',
				medium: 'Roboto-Medium',
				bold: 'Roboto-Bold',
				semibold: 'Roboto-Semibold',
				light: 'Roboto-Light',
				thin: 'Roboto-Thin'
			}
		};
	}
})();
