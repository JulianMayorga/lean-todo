'use strict';

describe('Lean todo app', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('should navigate to blabla', function () {
    expect(browser().location().url()).toBe('/');
  });
});
