'use strict';

describe('Service: Retention', function () {

	// load the service's module
	beforeEach(module('leanTodoApp'));

	// instantiate service
	var Retention,
		cookieStore;
	beforeEach(inject(function (_Retention_, $cookieStore) {
		Retention = _Retention_;
		cookieStore = $cookieStore;
	}));

	it('should know when a user has joined', function () {
		Retention.setUser(uuid.v1());
		expect(Retention.getJoinDate()).toBe(moment().format('LL'));
	});
	it('should know if a user has returned', function () {
		var yesterday = moment().subtract('days', 1).format('LL');
		cookieStore.put('joinDate', yesterday);
		var id = '123abc';
		Retention.setUser(id);
		expect(Retention.getJoinDate()).toBe(yesterday);
	});
	it('should only set joinDate if it is the first time a user enters', function () {});
	it('should send a message to the server when a user joins', function () {});
	it('should send a message to the server everyday that a user returns', function () {});

});
