'use strict';

describe('Service: Feature', function () {

	// load the service's module
	beforeEach(module('leanTodoApp'));

	// instantiate service
	var Feature,
		cookieStore;

	beforeEach(inject(function (_Feature_, $cookieStore) {
		Feature = _Feature_;
		cookieStore = $cookieStore;
	}));

	describe('IsAllowed', function () {
		// Ver http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data

		it('should return true if the feature is registered', function () {
			Feature.register('sidebar', 100);
			expect(Feature.isAllowed('sidebar')).toBe(true);
		});

		it('should return false if the feature is NOT registered', function () {
			expect(Feature.isAllowed('magic')).toBe(false);
		});
	});

	describe('Register', function () {
		it('should store the feature in a cookie', function () {
			expect(cookieStore.get('sidebar')).not.toBeDefined();
			Feature.register('sidebar', 100);
			expect(cookieStore.get('sidebar')).toBeDefined();
		});
		it('should register a single feature if percentage is 100', function () {
			Feature.register('sidebar', 100);
			expect(Feature.isAllowed('sidebar')).toBe(true);
			Feature.register('ftr', 0);
			expect(Feature.isAllowed('ftr')).toBe(false);
		});
		it('should NOT register a single feature if percentage is 0', function () {
			Feature.register('ftr', 0);
			expect(Feature.isAllowed('ftr')).toBe(false);
		});
		it('should register a feature based on a defined percentage', function () {
			spyOn(Math, 'random').andReturn(0.2);
			Feature.register('sidebar', 30);
			expect(Feature.isAllowed('sidebar')).toBe(true);
		});
		describe('If a cookie is set with the feature', function () {
			beforeEach(function () {
				cookieStore.put('ftr', true);
			});
			it('should use the feature previous value', function () {
				Feature.register('ftr', 0);
				expect(Feature.isAllowed('ftr')).toBe(true);
			});
		});
	});

	describe('Init', function () {
		beforeEach(function () {
			cookieStore.put('featurette', true);
		});
		it('should accept an array of features and try to register them', function () {
			var config = {
				'ftr': 100,
				'anotherFtr': 0,
				'featurette': 0.5
			};

			spyOn(Math, 'random').andReturn(0.1);
			Feature.init(config);

			expect(Feature.isAllowed('ftr')).toBe(true);
			expect(Feature.isAllowed('anotherFtr')).toBe(false);
			// Featurette value should be true because the cookie gets preference over the value that Math.random returned
			expect(Feature.isAllowed('featurette')).toBe(true);
		});
	});

});
