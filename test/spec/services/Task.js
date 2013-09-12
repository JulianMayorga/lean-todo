'use strict';

describe('Service: Task', function () {

  // load the service's module
  beforeEach(module('leanTodoApp'));

  // Constants
  var API_URL = 'api/task';

  // instantiate service
  var Task, httpBackend, resource, callback;

  beforeEach(inject(function ($injector, _Task_) {
    httpBackend = $injector.get('$httpBackend');
    Task = _Task_; // Que es @id.key?
    callback = jasmine.createSpy();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
  });

  it("should be a resource", function() {
    expect(typeof Task).toBe('function');
    expect(typeof Task.get).toBe('function');
    expect(typeof Task.save).toBe('function');
    expect(typeof Task.remove).toBe('function');
    expect(typeof Task['delete']).toBe('function');
    expect(typeof Task.query).toBe('function');
  });

  it('should start empty', function () {
    httpBackend.when('GET', API_URL).respond([]);
    expect(Task.size()).toBe(0);
  });

  it('should be able to add a task', function () {
    // Diferencia entre httpBackend.when y httpBackend.expect?
    httpBackend.expect('POST', API_URL, '{"text":"do something","done":false}').respond({id: 1, text: 'do something', done: false});
    var task = {
      text: 'do something',
      done: false
    };
    var response = Task.save(task);

    expect(response.text).toBe(task.text);
    expect(response.done).toBe(task.done);
  });

  it('should be able to get a task', function () {
    httpBackend.when('GET', API_URL + '/1').respond({taskId: 1, text: 'do something', done: false});
    var extractedTask = Task.get({taskId: 1});

    httpBackend.flush(); // Importante hacer flush!
    expect(extractedTask.text).toBe('do something');
  });

  it('should be able to remove a task', function () {
    httpBackend.expect('DELETE', API_URL + '/333').respond(204, null);

    var response = Task.remove({taskId: 333}, callback);

    expect(callback).not.toHaveBeenCalled();
    httpBackend.flush();
    expect(callback).toHaveBeenCalled();
  });

  it('should be able to retrieve all tasks', function () {
    var task = {
      text: 'do something',
      done: false
    };
    var anotherTask = {
      text: 'do something else',
      done: false
    };
    var all_tasks = [];

    httpBackend.when('GET', API_URL).respond([task, anotherTask]);

    all_tasks = Task.query();

    httpBackend.flush();
    expect(all_tasks[0].text).toBe(task.text);
    expect(all_tasks[1].text).toBe(anotherTask.text);
  });

});
