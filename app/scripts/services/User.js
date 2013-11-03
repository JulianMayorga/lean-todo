'use strict';

angular.module('leanTodoApp')
.service('User', function User($cookieStore) {
	var _user = {
		id: null
	};

	this.register = function () {
		var id = null;
		var storedId = $cookieStore.get('uuid');

		if (storedId !== undefined) {
			id = storedId;
		} else {
			id = uuid.v1();
			$cookieStore.put('uuid', id);
		}

		_user.id = id;

		return _user;
	};

	this.getId = function () {
		return _user.id;
	};
});
