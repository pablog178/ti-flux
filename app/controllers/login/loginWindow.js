/**
 * Controller-View for the Login Window
 * @class Controllers.login.loginWindow
 */

var args = arguments[0] || {};

const LOG_TAG = '\x1b[31m' + '[controllers/login/loginWindow]' + '\x1b[39;49m ';

var Session = require('/stores/session');
var Container = require('/utils/container');

var LoginWindow = function () {
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
				var state = container.getState();

				if ($[_key].value !== _value) {
					$[_key].value = _value;
				}

				$.resetClass($.login, getLoginButtonClasses(state.username, state.password));
				break;
			case 'loading':
				$.loadingContainer.visible = _value;
				break;
			case 'errorMessage':
				alert(_value);
				break;
			}
		});
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
		var loginButtonClasses = ['loginButton'];

		if (isLoginEnabled) {
			loginButtonClasses.push('loginButtonEnabled');
		} else {
			loginButtonClasses.push('loginButtonDisabled');
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

		container.setState(state);
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

	return _.extend({}, container, {

	});
};

_.extend($, new LoginWindow());
