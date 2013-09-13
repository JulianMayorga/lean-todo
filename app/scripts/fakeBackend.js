'use strict';

// ngMockE2E documentation: http://docs.angularjs.org/api/ngMockE2E.$httpBackend
var leanTodoAppDev = angular.module('leanTodoAppDev', ['leanTodoApp', 'ngMockE2E']);
leanTodoAppDev.run(function ($httpBackend) {
  var tasks = [];

  $httpBackend.whenGET('views/main.html').passThrough();

  $httpBackend.whenGET('/task').respond(function () {
    return [200, tasks, {}];
  });

  $httpBackend.whenPOST('/task').respond(function(method, url, data, headers) {
    var task = angular.fromJson(data);
    task._id = new Date().getTime();
    tasks.push(task);
    return [200, 'SUCCESS'];
  });

  $httpBackend.whenPUT('/task').respond(function(method, url, data, headers) {
    var newTask = angular.fromJson(data);
    var taskToUpdateIndex;
    tasks.forEach(function (element, index, array) {
      if (element._id === newTask._id) {
        taskToUpdateIndex = index;
      }
    });
    if (taskToUpdateIndex !== -1) {
      tasks.splice(taskToUpdateIndex, 1);
      tasks.push(newTask);
      return [200, 'SUCCESS'];
    }

    return [404, 'NOT FOUND'];
  });

  $httpBackend.whenDELETE(/\/task\/d*/).respond(function(method, url, data) {
    var parts = url.replace("/task", "").split("/");
    if (parts.length != 2) {
        return [409, "invalid id"];        
    }
    var id = parts[1];
    var taskIndex;
    tasks.forEach(function (element, index, array) {
      if (element._id == id) {
        taskIndex = index;
      }
    });
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      return [200, 'SUCCESS'];
    }

    return [404, 'NOT FOUND'];
  });
});
