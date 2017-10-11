/**
 * Controller-View for the Login Window
 * @class Controllers.login.loginWindow
 */

var args = arguments[0] || {};

const LOG_TAG = '\x1b[31m' + '[controllers/login/loginWindow]' + '\x1b[39;49m ';

var Session = require('/stores/session');

var LoginWindow = function () {
	var state = {};

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

	/**
	 * @method render
	 * Updates all the UI components based on this controller's state
	 * @return {void}
	 */
	function render(_state) {
		doLog && console.log(LOG_TAG, '- render');

		_.each(_state, function (_value, _key) {
			switch (_key) {
			case 'username':
			case 'password':
				if ($[_key].value !== _value) {
					$[_key].value = _value;
				}
				$.resetClass($.login, getLoginButtonClasses(state.username, state.password));
				break;
			}
		});
	}

	/**
	 * @method setState
	 * Updates the internat state of the controller, calling render if something changes
	 * @param {Object} _state New properties to update in the state
	 * @return {void}
	 */
	function setState(_state) {
		doLog && console.log(LOG_TAG, '- setState');

		var oldState = JSON.parse(JSON.stringify(state));
		var diffState = {};

		_.extend(state, _state);

		_.each(state, function (_value, _key) {
			if (!_.isEqual(state[_key], oldState[_key])) {
				diffState[_key] = _value;
			}
		});

		render(diffState);
	}

	// +-------------------
	// | Private members.
	// +-------------------

	/**
	 * @method getLoginButtonClasses
	 * @private
	 * Updates the loginButton enabled/disabled status
	 * @return {void}
	 */
	function getLoginButtonClasses(_username, _password) {
		doLog && console.log(LOG_TAG, '- getLoginButtonClasses');

		var isLoginEnabled = !!(_username && _password);
		var loginButtonClasses = ['login-button'];

		if (isLoginEnabled) {
			loginButtonClasses.push('login-button-enabled');
		} else {
			loginButtonClasses.push('login-button-disabled');
		}

		return loginButtonClasses;
	}

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

		var id = _evt.source.id;
		var state = {};

		state[id] = _evt.source.value;

		setState(state);
	}

	/**
	 * @method handleLoginClick
	 * @private
	 * Handles the click event in the login button
	 * @param {Object} _evt Click event
	 * @return {void}
	 */
	function handleLoginClick(_evt) {
		doLog && console.log(LOG_TAG, '- handleLoginClick');

		Session.login($.username.value, $.password.value);
	}

	init();

	$.username.addEventListener('change', handleLoginFieldChange);
	$.password.addEventListener('change', handleLoginFieldChange);
	$.login.addEventListener('click', handleLoginClick);

	return {
		render: render,
		setState: setState
	};
};

_.extend($, new LoginWindow());
