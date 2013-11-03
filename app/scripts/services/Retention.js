'use strict';

angular.module('leanTodoApp')
.service('Retention', function Retention() {
	var _user = {
		id: null,
		joinDate: null
	};

	this.setUser = function (id) {
		_user.id = id;
		_user.joinDate = moment().format('LL');
	};

	this.getJoinDate = function () {
		return _user.joinDate;
	};
});
