'use strict';

angular.module('leanTodoApp')
  .controller('TaskCtrl', function ($scope) {
    $scope.tasks = [];
    $scope.addTask = function (text) {
      var taskToAdd = {
	      text: text,
	      done: false
      };
      $scope.tasks.push(taskToAdd);
      $scope.newTask = '';
    };
  });
