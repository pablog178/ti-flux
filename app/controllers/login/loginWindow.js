/**
 * Controller-View for the Login Window
 * @class Controllers.login.loginWindow
 */

var args = arguments[0] || {};

const LOG_TAG = '\x1b[31m' + '[controllers/login/loginWindow]' + '\x1b[39;49m ';

/**
 * @method init
 * @private
 * Initializes the controller
 * @return {void}
 */
function init () {
	doLog && console.log(LOG_TAG, '- init');
}

// +-------------------
// | Public members.
// +-------------------

// +-------------------
// | Private members.
// +-------------------

// +-------------------
// | Event Handlers declaration.
// +-------------------

/**
 * @method handleLoginFieldChange
 * @private
 * Handler for the change event in the login and password textfields
 * @param {Object} _evt Change event
 * @return {void}
 */
function handleLoginFieldChange(_evt) {
	doLog && console.log(LOG_TAG, '- handleLoginFieldChange');
	
	var loginEnabled = ($.username.value && $.password.value);
}

init();

$.username.addEventListener('change', handleLoginFieldChange);
$.password.addEventListener('change', handleLoginFieldChange);
