var should = require('external/should');
var StateMachine = require('/utils/stateMachine');

describe('/utils/stateMachine', function () {
	var testMachine = new StateMachine({
		start: {
			transition: function () {
				return 'state1';
			}
		},
		state1: {
			transition: function (_jump) {
				if (_jump) {
					return 'state3';
				}

				return 'state2';
			}
		},
		state2: {
			transition: function () {
				return 'state1';
			}
		},
		state3: {
			transition: function () {
				return 'state1';
			}
		}
	});

	describe('#start()', function () {
		it('should begin with the "start" state', function () {
			testMachine.start();
			should.equal(testMachine.getCurrentState(), 'start');
		});
	});

	describe('#transitionToNextState()', function () {
		it('should go to state1 according to start.transition()', function () {
			testMachine.transitionToNextState();
			testMachine.getCurrentState().should.equals('state1');
		});

		it('should go to state3 based on state1.transition()', function () {
			testMachine.transitionToNextState(true);
			testMachine.getCurrentState().should.equals('state3');
		});

		it('should go to state1 based on state3.transition()', function () {
			testMachine.transitionToNextState(true);
			testMachine.getCurrentState().should.equals('state1');
		});

		it('should go to state2 based on state1.transition()', function () {
			testMachine.transitionToNextState(false);
			testMachine.getCurrentState().should.equals('state2');
		});
	});
});
