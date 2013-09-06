'use strict';

describe('Controller: TaskCtrl', function () {

  // load the controller's module
  beforeEach(module('leanTodoApp'));

  var TaskCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskCtrl = $controller('TaskCtrl', {
      $scope: scope
    });
  }));

  it('should be able to add a task to the list', function () {
    expect(scope.tasks.length).toBe(0);
    scope.addTask('do laundry');
    expect(scope.tasks.length).toBe(1);
    expect(scope.tasks[0].text).toBe('do laundry');
  });

  it('should clean the newTask value after adding a task', function () {
    scope.addTask('do laundry');
    expect(scope.newTask).toBe('');
  });

});
