'use strict';

describe('Controller: TaskCtrl', function () {

  // load the controller's module
  beforeEach(module('leanTodoApp'));

  var TaskCtrl, scope;
  var TaskStub = jasmine.createSpyObj('TaskStub', ['query', 'save', 'remove', 'get', 'toggleDone']);

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskCtrl = $controller('TaskCtrl', {
      $scope: scope,
      // Ver de que se trata $provide
      Task: TaskStub
    });
  }));

  describe('Add task: ', function () {
    it('should be able to add a task to the list', function () {
      // Es suficiente verificar que se llamaron los metodos de Task?
      expect(TaskStub.query).toHaveBeenCalled();
      scope.addTask('do laundry');
      expect(TaskStub.save).toHaveBeenCalled();
    });

    it('should clean the newTask value after adding a task', function () {
      scope.addTask('do laundry');
      expect(scope.newTask).toBe('');
    });
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

  describe('Remove task: ', function () {
    it('should remove a task', function () {
      var task = {
        text: 'do something',
        done: false
      };
      scope.addTask(task); // Es necesario agregarla? Se podria usar el id de una existente?
      scope.removeTask(task);
      expect(TaskStub.remove).toHaveBeenCalled();
    });
  });

  describe('Edit task: ', function () {

    it('should be able to mark a task as done', function () {
      var task = {
        text: 'do something',
        done: false
      };
      scope.addTask(task);
      scope.toggleDone(task);
      expect(TaskStub.toggleDone).toHaveBeenCalled();
    });
  });

});
