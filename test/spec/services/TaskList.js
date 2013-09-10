'use strict';

describe('Service: TaskList', function () {

  // load the service's module
  beforeEach(module('leanTodoApp'));

  // instantiate service
  var TaskList;
  beforeEach(inject(function (_TaskList_) {
    TaskList = _TaskList_;
  }));

  it('should start empty', function () {
    expect(TaskList.size).toBeDefined();
    expect(TaskList.size()).toBe(0);
  });

  it('should be able to add a task', function () {
    var task = {
      text: 'do something',
      done: false
    };
    TaskList.add(task);
    expect(TaskList.size()).toBe(1);
  });

  it('should be able to get a task', function () {
    var task = {
      text: 'do something',
      done: false
    };
    TaskList.add(task);
    var extractedTask = TaskList.get(0);
    expect(extractedTask.text).toBe('do something');
  });

  it('should be able to remove a task', function () {
    var task = {
      text: 'do something',
      done: false
    };
    var anotherTask = {
      text: 'do something else',
      done: false
    };
    TaskList.add(task);
    TaskList.add(anotherTask);
    expect(TaskList.size()).toBe(2);
    TaskList.remove(task);
    expect(TaskList.size()).toBe(1);
  });

  it('should alter indexes when removing a task', function () {
    var task = {
      text: 'do something',
      done: false
    };
    var anotherTask = {
      text: 'do something else',
      done: false
    };
    TaskList.add(task);
    TaskList.add(anotherTask);
    TaskList.remove(task);
    expect(TaskList.get(0).text).toBe('do something else');
  });

});
