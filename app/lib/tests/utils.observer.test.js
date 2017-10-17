var should = require('external/should');
var Observer = require('/utils/observer');

describe('/utils/observer', function () {
	var observer = new Observer();
	var triggers = {
		trigger1: 0,
		trigger2: 0,
		trigger3: 0,
		trigger4: 0
	};

	function trigger1(_evt) {
		triggers.trigger1++;
	}

	function trigger2(_evt) {
		triggers.trigger2++;
	}

	function trigger3(_evt) {
		triggers.trigger3++;
	}

	function trigger4(_evt) {
		triggers[_evt.name]++;
	}

	describe('#addListener()', function () {
		it('Should add multiple event listeners to the same event', function () {
			observer.addListener('evt1', trigger1);

			observer.addListener('evt1', trigger2);
		});

		it('Should add multiple event listeners to multiple events', function () {
			observer.addListener('evt1', trigger3);

			observer.addListener('evt2', trigger4);
		});

		it('Should throw an exception if no function is declared as listener', function () {
			should.throws(function () {
				observer.addListener('evt3');
			});
		});
	});

	describe('#fireEvent()', function () {
		it('Should notify multiple listeners for evt1', function () {
			observer.fireEvent('evt1');

			should.equal(triggers.trigger1, 1);
			should.equal(triggers.trigger2, 1);
			should.equal(triggers.trigger3, 1);
			should.equal(triggers.trigger4, 0);
		});

		it('Should send parameters in event', function () {
			observer.fireEvent('evt2', {
				name: 'trigger4'
			});

			should.equal(triggers.trigger1, 1);
			should.equal(triggers.trigger2, 1);
			should.equal(triggers.trigger3, 1);
			should.equal(triggers.trigger4, 1);
		});

		it('Should not notify any listeners for evt3', function () {
			observer.fireEvent('evt3');

			should.equal(triggers.trigger1, 1);
			should.equal(triggers.trigger2, 1);
			should.equal(triggers.trigger3, 1);
			should.equal(triggers.trigger4, 1);
		});
	});

	describe('#removeListener()', function () {
		it('Should remove a single listener from evt1', function () {
			observer.removeListener('evt1', trigger1);

			observer.fireEvent('evt1');

			should.equal(triggers.trigger1, 1);
			should.equal(triggers.trigger2, 2);
			should.equal(triggers.trigger3, 2);
			should.equal(triggers.trigger4, 1);
		});

		it('Should remove multiple listeners from evt1', function () {
			observer.removeListener('evt1');

			observer.fireEvent('evt1');

			should.equal(triggers.trigger1, 1);
			should.equal(triggers.trigger2, 2);
			should.equal(triggers.trigger3, 2);
			should.equal(triggers.trigger4, 1);
		});
	});
});
