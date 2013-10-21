'use strict';

angular.module('leanTodoApp')
.service('Feature', function Feature($cookieStore) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var features = {};
	var featureService = {
		isAllowed: function (ftr) {
			var feature = null;
			var result = false;

			Object.keys(features).forEach( function (element, index, array) {
				if (ftr === element) {
					if (features[element] === true) {
						result = true;
					}
				}
			});

			return result;
		},
		register: function (ftr, probability) {
			var randomValue = Math.random(),
				isAllowed = null,
				storedValue = null;

			if (randomValue < probability) {
				isAllowed = true;
			} else {
				isAllowed = false;
			}

			storedValue = $cookieStore.get(ftr);
			if (storedValue === undefined) {
				$cookieStore.put(ftr, isAllowed);
				features[ftr] = isAllowed;
			} else {
				$cookieStore.put(ftr, storedValue);
				features[ftr] = storedValue;
			}
		},
		init: function (config) {
			var that = this;
			Object.keys(config).forEach(function (element, index, array) {
				that.register(element, config[element]);
			});
		}
	};

	return featureService;
});
