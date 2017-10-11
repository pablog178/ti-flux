/**
 * Instantiable object for controlling state changes on other objects.
 * @class Helpers.observer
 * @version 1.0
 * ### Example
 // Obj1

 function Obj1(){
	var obj2 = new Obj2();
	obj2.addListener('change', handleChange);

	// ...

	function handleChange(_evt) {
		// Do something with _evt.foo;
	}
 }
 
 // Obj2
 var Observer = require('helpers/observer');
 function Obj2() {
	observer = new Observer();

	function addListener(_evtName, _listener){
		observer.addListener(_evtName, _listener);
	}

	// ...

	function setFoo(_foo) {
		foo = _foo;
		observer.fireEvent('change', {foo: foo});
	}
 }
 */
const LOG_TAG = '\x1b[31m' + '[helpers/observer]' + '\x1b[39;49m ';

function Observer() {
	/**
	 * @property {Object} functionHandlers List of listeners per event
	 */
	var functionHandlers = {};

	/**
	 * @property {Number} handlersCount=0 Counter of handlers to send as token
	 */
	var handlersCount = 0;

	/**
	 * @method addListener
	 * Adds a new event listener for the given event
	 * @param {String} _eventName Name of the event
	 * @param {Function} _handler Function to handle the event when fired
	 * @return {void}
	 */
	function addListener(_eventName, _handler) {
		doLog && console.debug(LOG_TAG, '- addListener');

		var eventHandlers = functionHandlers[_eventName];
		var token = null;

		if (!eventHandlers) {
			eventHandlers = {};

			functionHandlers[_eventName] = eventHandlers;
		}

		token = '' + handlersCount;

		eventHandlers[token] = _handler;

		handlersCount += 1;

		return token;
	}

	/**
	 * @method removeListener
	 * Removes the event listener from the list on the given event name
	 * @param {String} _eventName Name of the event to remove the handler
	 * @param {String} _token Token id of the function to remove
	 * @return {void}
	 */
	function removeListener(_eventName, _token) {
		doLog && console.debug(LOG_TAG, '- removeListener');

		var eventHandlers = functionHandlers[_eventName];

		if (!_token) {
			throw Error('Token not defined for event: ' + _eventName + ' (' + _token + ')');
		}

		if (!eventHandlers) {
			doLog && console.debug(LOG_TAG, '- removeListener - no eventHandlers for event: ' + _eventName);
			return false;
		}

		if (!eventHandlers[_token]) {
			doLog && console.debug(LOG_TAG, '- removeListener - no eventHandler for token: ' + _token);
			return false;
		}

		delete eventHandlers[_token];
	}

	/**
	 * @method fireEvent
	 * Throws a new event with the given data for all the listeners for that event name
	 * @param {String} _eventName Name of the event to call
	 * @param {Object} _data Data to send to each listener
	 * @return {void}
	 */
	function fireEvent(_eventName, _data) {
		doLog && console.debug(LOG_TAG, '- fireEvent');

		var data = _data || {};

		var eventHandlers = functionHandlers[_eventName];

		if (!eventHandlers) {
			return false;
		}

		_.each(eventHandlers, function (_eventHandler) {
			_eventHandler(data);
		});
	}

	return {
		addListener: addListener,
		removeListener: removeListener,
		fireEvent: fireEvent
	};
}

module.exports = Observer;
