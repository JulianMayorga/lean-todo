'use strict';

angular.module('leanTodoApp')
  .controller('TaskCtrl', function ($scope, Task) {
    $scope.tasks = Task.query();
    $scope.addTask = function (text) {
      var taskToAdd = {
	      text: text,
	      done: false
      };
      Task.save(taskToAdd);
      // synchronize tasks in scope with Task
      $scope.tasks = Task.query();
      $scope.newTask = '';
    };
    $scope.removeTask = function (task) {
      Task.remove(task.id);
      // synchronize tasks in scope with Task
      $scope.tasks = Task.query();
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
