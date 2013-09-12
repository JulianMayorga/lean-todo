'use strict';

angular.module('leanTodoApp')
  .factory('Task', ['$resource', function ($resource) {
    // Service logic
    // ...

    var defaultParams = {
      taskId: '@taskId' // Que es @taskId???
    };
    var url = 'api/task/:taskId';
    var _Task = $resource( url, defaultParams );

    _Task.size = function () {
      return _Task.query().length;
    }

    // Public API here
    return _Task;
  }]);
