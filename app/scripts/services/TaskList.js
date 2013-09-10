'use strict';

angular.module('leanTodoApp')
  .factory('TaskList', function () {
    // Service logic
    // ...

    var tasks = [];

    // Public API here
    return {
      size: function () {
        return tasks.length;
      },
      add: function (task) {
        tasks.push(task);
      },
      get: function (index) {
        return tasks[index];
      },
      remove: function (task) {
        tasks.splice(tasks.indexOf(task), 1);
      },
      getAll: function () {
        return tasks;
      }
    };
  });
