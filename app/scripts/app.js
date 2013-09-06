'use strict';

angular.module('leanTodoApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'TaskCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
