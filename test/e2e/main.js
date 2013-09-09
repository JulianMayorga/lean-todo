'use strict';

describe('Lean todo app', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('does not redirect', function () {
    expect(browser().location().url()).toBe('/');
  });

  describe('Add task :', function () {
    it('should add a task to the list', function () {
      expect(element('.task').count()).toEqual(0);
      input('newTask').enter('do laundry');
      element('#new-task-btn').click();
      expect(element('.task').count()).toEqual(1);
      expect(element('.task .text').text()).toEqual('do laundry');
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

  describe('Tasks list: ', function () {
    it('should mark a task as done when checked', function () {
      input('newTask').enter('do laundry');
      element('#new-task-btn').click();
      input('task.done').check();
      expect(element('.text').attr('class')).toContain('done-true');
      expect(element('.text').css('text-decoration')).toBe('line-through');
    });

    // Skip test until I figure out how to access the first element in repeater
    xit('should put tasks that are not done first', function () {
      input('newTask').enter('do laundry');
      element('#new-task-btn').click();
      input('newTask').enter('go shopping');
      element('#new-task-btn').click();
      input('task.done').check();
      input('newTask').enter('study');
      element('#new-task-btn').click();
      expect(repeater('.text').row(0)).toEqual('do laundry');
    });
  });

});
