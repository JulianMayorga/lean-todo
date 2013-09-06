'use strict';

describe('Lean todo app', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('does not redirect', function () {
    expect(browser().location().url()).toBe('/');
  });

  it('should add a task to the list', function () {
    expect(element('.task').count()).toEqual(0);
    input('newTask').enter('do laundry');
    element('#new-task-btn').click();
    expect(element('.task').count()).toEqual(1);
    expect(element('.task input').val()).toEqual('do laundry');
  });

  it('should start with an empty task input', function () {
    expect(input('newTask').val()).toEqual('');
  });

  it('should clean the input value after adding a task', function () {
    input('newTask').enter('do laundry');
    element('#new-task-btn').click();
    expect(input('newTask').val()).toEqual('');
  });

});
