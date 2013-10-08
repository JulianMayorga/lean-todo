'use strict';

angular.module('leanTodoApp', ['ngResource'])
.config(function ($routeProvider, $httpProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'TaskCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
