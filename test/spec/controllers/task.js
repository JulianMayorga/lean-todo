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

  describe('Filter tasks: ', function () {
    // Inject orderBy filter before each test
    // https://github.com/angular/angular.js/blob/master/test/ng/filter/orderBySpec.js
    beforeEach(inject(function($filter) {
      scope.orderBy = $filter('orderBy');
    }));

    it('should order tasks with done tasks first', function () {
      var tasks = [
        {
          text: 'not',
          done: false
        },
        {
          text: 'yes',
          done: true
        },
        {
          text: 'not done at all',
          done: false
        }
      ];

      var sortedTasks = scope.orderBy(tasks, scope.doneFirst);
      expect(sortedTasks[2]).toBe(tasks[1]);
    });
  });

});
