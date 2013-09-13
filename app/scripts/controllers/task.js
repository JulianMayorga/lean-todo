'use strict';

angular.module('leanTodoApp')
  .controller('TaskCtrl', function ($scope, $location, Task) {

    loadTasks();

    $scope.addTask = function (text) {
      var taskToAdd = {
	      text: text,
	      done: false
      };
      Task.save(taskToAdd, loadTasks);
      $scope.newTask = '';
    };

    $scope.removeTask = function (task) {
      Task.remove({taskId: task._id}, loadTasks);
    };

    $scope.toggleDone = function (task) {
      Task.toggleDone(task, loadTasks);
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

    function loadTasks () {
      $scope.tasks = Task.query();
    }
  });
