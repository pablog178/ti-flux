/**
 * Main library for running all the tests
 * @class Test.index
 * @singleton
 */

const LOG_TAG = '\x1b[35m' + '[test/index]' + '\x1b[39;49m ';
require('external/ti-mocha');

var Test = (function () {
	// +-------------------
	// | Private members.
	// +-------------------

	/**
	 * @method loadTestsInFolder
	 * @private
	 * Loads all the JS files within the given folder
	 * @param {String} _folderPath Folder to load
	 * @return {void}
	 */
	function loadTestsInFolder(_folderPath) {
		doLog && console.debug(LOG_TAG, '- loadTestsInFolder');

		var folder = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, _folderPath);
		var filesPaths = folder.getDirectoryListing();

		if (filesPaths && filesPaths.length) {
			_.each(filesPaths, function (_filePath) {
				var completeFilePath = _folderPath + '/' + _filePath;
				var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, _folderPath, _filePath);

				if (file.isDirectory()) {
					loadTestsInFolder(completeFilePath);
				} else {
					require(completeFilePath);
					// try {
					// } catch (_err) {
					// 	console.error('Problem loading: ' + completeFilePath + ': ' + JSON.stringify(_err));
					// }
				}
			});
		}
	}

	// +-------------------
	// | Public members.
	// +-------------------

	/**
	 * @method run
	 * Runs all the tests
	 * @return {void}
	 */
	function run() {
		doLog && console.debug(LOG_TAG, '- run');

		loadTestsInFolder('test');

		mocha.run();
	}

	return {
		run: run
	};
})();

module.exports = Test;
