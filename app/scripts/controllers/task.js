'use strict';

angular.module('leanTodoApp')
  .controller('TaskCtrl', function ($scope, TaskList) {
    $scope.tasks = TaskList.getAll();
    $scope.addTask = function (text) {
      var taskToAdd = {
	      text: text,
	      done: false
      };
      TaskList.add(taskToAdd);
      // synchronize tasks in scope with TaskList
      $scope.tasks = TaskList.getAll();
      $scope.newTask = '';
    };
    $scope.removeTask = function (task) {
      var index = $scope.tasks.indexOf(task);
      TaskList.remove(index);
      // synchronize tasks in scope with TaskList
      $scope.tasks = TaskList.getAll();
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
