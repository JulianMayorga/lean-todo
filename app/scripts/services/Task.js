'use strict';

angular.module('leanTodoApp')
  .factory('Task', ['$resource', function ($resource) {
    // Service logic
    // ...

    var customMethods = {
      update: { method: 'PUT' }
    };
    var defaultParams = {
      taskId: '@taskId' // Que es @taskId???
    };
    var url = '/task/:taskId';
    var _Task = $resource(url, defaultParams, customMethods);

    _Task.size = function () {
      return _Task.query().length;
    }

    _Task.toggleDone = function (task) {
      task.done = !task.done;
      _Task.update(task);
    }

    // Public API here
    return _Task;
  }]);
