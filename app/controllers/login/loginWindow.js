/**
 * Controller-View for the Login Window
 * @class Controllers.login.loginWindow
 */

const LOG_TAG = '\x1b[31m' + '[controllers/login/loginWindow]' + '\x1b[39;49m ';

var Session = require('/stores/session');
var Container = require('/utils/container');

// +-------------------
// | Private properties.
// +-------------------

/**
 * @property {Utils.container} container Container
 */
var container = new Container({
	stores: [Session],
	render: render
});

/**
 * @method init
 * @private
 * Initializes the controller
 * @return {void}
 */
function init() {
	doLog && console.log(LOG_TAG, '- init');
}

// +-------------------
// | Public members.
// +-------------------

// +-------------------
// | Private members.
// +-------------------

/**
 * @method render
 * Updates all the UI components based on this controller's state
 * @return {void}
 */
function render(_props) {
	doLog && console.log(LOG_TAG, '- render');

	_.each(_props, function (_value, _key) {
		switch (_key) {
			case 'username':
			case 'password':
				var state = container.getState();

				if ($[_key].value !== _value) {
					$[_key].value = _value || '';
				}

				$.resetClass(
					$.login,
					getLoginButtonClasses(state.username, state.password)
				);
				break;
			case 'status':
				$.loadingContainer.visible = _value === 'loading';
				break;
			case 'errorMessage':
				_value && alert(_value);
				break;
		}
	});
}

/**
 * @method getLoginButtonClasses
 * @private
 * Updates the loginButton enabled/disabled status
 * @return {void}
 */
function getLoginButtonClasses(_username, _password) {
	doLog && console.log(LOG_TAG, '- getLoginButtonClasses');

	var isLoginEnabled = !!(_username && _password);
	var loginButtonClasses = ['loginButton'];

	if (isLoginEnabled) {
		loginButtonClasses.push('loginButtonEnabled');
	} else {
		loginButtonClasses.push('loginButtonDisabled');
	}

	return loginButtonClasses;
}

// +-------------------
// | Event Handlers.
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

	var id = _evt.source.id;
	var state = {};

	state[id] = _evt.source.value;

	container.setState(state);
}

/**
 * @method handleLoginClick
 * @private
 * Handles the click event in the login button
 * @return {void}
 */
function handleLoginClick() {
	doLog && console.log(LOG_TAG, '- handleLoginClick');

	Session.login($.username.value, $.password.value);
}

init();

$.username.addEventListener('change', handleLoginFieldChange);
$.password.addEventListener('change', handleLoginFieldChange);
$.login.addEventListener('click', handleLoginClick);
