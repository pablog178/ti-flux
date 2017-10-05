/**
 * Container for the login business rules
 * @class Containers.login
 */

const LOG_TAG = '\x1b[35m' + '[containers/login]' + '\x1b[39;49m ';

const Login = function (_props) {
	// +-------------------
	// | Private members.
	// +-------------------

	const props = _props || {};

	const controller = Alloy.createController('login/loginWindow', props);

	// +-------------------
	// | Public members.
	// +-------------------

	return {
		window: controller.window
	};
};

module.exports = Login;