'use strict';

describe('Lean todo app', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('does not redirect', function () {
    expect(browser().location().url()).toBe('/');
  });

  describe('Add task:', function () {
    it('should add a task to the list', function () {
      expect(element('.task').count()).toEqual(0); //FakeBackend has 0 tasks
      input('newTask').enter('do laundry');
      element('#new-task-btn').click();
      expect(element('.task').count()).toEqual(1);
      expect(element('#task-0').text()).toContain('do laundry'); // Task index is 1 because the not done task has index 2
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
      element('#task-0 .toggle-done-btn').click();
      expect(element('#task-0 .text').attr('class')).toContain('done-true');
      expect(element('#task-0 .text').css('text-decoration')).toBe('line-through');
    });

    it('should put tasks that are not done first', function () {
      input('newTask').enter('go shopping');
      element('#new-task-btn').click();
      element('#task-0 .toggle-done-btn').click();
      expect(element('#task-0 span').text()).toEqual('go shopping');
      input('newTask').enter('study');
      element('#new-task-btn').click();
      // Now the first element should be study because it is not done
      expect(element('#task-0 span').text()).toEqual('study');
    });
  });

  describe('Delete tasks: ', function () {

    it('should remove a task when delete is clicked', function () {
      input('newTask').enter('do laundry');
      element('#new-task-btn').click();
      expect(element('.task').count()).toEqual(1);
      element('.remove-task').click();
      expect(element('.task').count()).toEqual(0);
    });
  });

});
