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
    $scope.removeTask = function (task) {
      var index = $scope.tasks.indexOf(task);
      $scope.tasks.splice(index, 1);
    };
    $scope.doneFirst = function (task) {
      var result;
      if (task.done) {
        result = 1;
      } else {
        result = 0;
      }
      return result;
    };
  });
