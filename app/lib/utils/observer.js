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
	 * @method addListener
	 * Adds a new event listener for the given event
	 * @param {String} _eventName Name of the event
	 * @param {Function} _handler Function to handle the event when fired
	 * @return {void}
	 */
	function addListener(_eventName, _handler) {
		doLog && console.debug(LOG_TAG, '- addListener');

		if (!_eventName || !_.isString(_eventName)) {
			throw Error('_eventName is not a valid String: ' + _eventName);
		}

		if (!_handler || !_.isFunction(_handler)) {
			throw Error('_handler is not a valid Function: ' + _eventName);
		}

		var eventHandlers = functionHandlers[_eventName];

		if (!eventHandlers) {
			eventHandlers = [];

			functionHandlers[_eventName] = eventHandlers;
		}

		eventHandlers.push(_handler);

		return _handler;
	}

	/**
	 * @method removeListener
	 * Removes the event listener from the list on the given event name
	 * @param {String} _eventName Name of the event to remove the handler
	 * @param {String} _token Token id of the function to remove
	 * @return {void}
	 */
	function removeListener(_eventName, _handler) {
		doLog && console.debug(LOG_TAG, '- removeListener');

		var eventHandlers = functionHandlers[_eventName];
		var handlerIndex = null;

		if (!eventHandlers) {
			doLog &&
				console.debug(
					LOG_TAG,
					'- removeListener - no eventHandlers for event: ' + _eventName
				);
			return false;
		}

		if (!_handler) {
			doLog &&
				console.log(
					LOG_TAG,
					'- removeListener - removing all listeners for event: ' + _eventName
				);
			functionHandlers[_eventName] = [];
			return false;
		}

		handlerIndex = _.indexOf(eventHandlers, _handler);

		if (handlerIndex < 0) {
			doLog &&
				console.debug(
					LOG_TAG,
					'- removeListener - no eventHandler for index: ' + handlerIndex
				);
			return false;
		}

		eventHandlers.splice(handlerIndex, 1);
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
