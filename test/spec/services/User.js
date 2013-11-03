'use strict';

describe('Service: User', function () {

	// load the service's module
	beforeEach(module('leanTodoApp'));

	// instantiate service
	var User,
		cookieStore;

	beforeEach(inject(function (_User_, $cookieStore) {
		User = _User_;
		cookieStore = $cookieStore;
	}));

	describe('Register', function () {
		it('should generate a unique id if successful', function () {
			var user = User.register();
			expect(user.id).toBeDefined();
			expect(typeof user.id).toBe('string');
			expect(user.id.length).toBe(36); //uuid length
		});
		it('should store the generated id in cookieStore', function () {
			expect(cookieStore.get('uuid')).not.toBeDefined();
			var user = User.register();
			expect(cookieStore.get('uuid')).toBeDefined();
		});
		it('should not generate a new id if user already registered before', function () {
			var id = User.register().id;
			var anotherId = User.register().id;
			expect(id == anotherId).toBeTruthy();
		});
		xit('should register a user if both passwords match', function () {});
		xit('should only accept valid email addreses', function () {});
		xit('should NOT register a user if both passwords dont match', function () {});
		xit('should NOT register a user if email or password are missing', function () {});
	});

	describe('getId', function () {
		it('should return the user id', function () {
			expect(User.getId()).toBe(null);
			User.register();
			expect(User.getId()).toBeDefined();
		});
	});

});
