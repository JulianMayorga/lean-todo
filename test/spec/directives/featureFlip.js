'use strict';

describe('Directive: featureFlip', function () {

  // load the directive's module
  beforeEach(module('leanTodoApp'));

  var element,
    scope,
	$compile;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  beforeEach(inject(function (_$rootScope_, _$compile_, $templateCache) {
	  scope = _$rootScope_;
	  $compile = _$compile_;
	  $templateCache.put('templ_url.html', '<div>New content</div>');
  }));

  it('should replace the directive inner content with the desired template from url if condition is true', inject(function ($compile) {
    element = angular.element('<feature-flip template-url="templ_url.html" condition="true"><div>Old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('New content');
  }));

  it('should NOT replace the directive inner content with the desired template from url if condition is false', inject(function ($compile) {
    element = angular.element('<feature-flip template-url="templ_url.html" condition="false"><div>Old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('Old content');
  }));

  it('should replace the directive inner content with the desired inline template if condition is true', inject(function ($compile) {
    element = angular.element('<feature-flip template="<div>New content</div>" condition="true"><div>Old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('New content');
  }));

  it('should NOT replace the directive inner content with the desired inline template if condition is false', inject(function ($compile) {
    element = angular.element('<feature-flip template="<div>New content</div>" condition="false"><div>Old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('Old content');
  }));

  it('should allow expressions in condition attribute', function () {
	  scope.feature = true;
    element = angular.element('<feature-flip template="<div>New content</div>" condition="feature"><div>Old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(scope.feature).toBeTruthy();
    expect(element.text()).toBe('New content');
	  scope.feature = false;
    element = angular.element('<feature-flip template="<div>New content</div>" condition="feature"><div>Old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(scope.feature).toBeFalsy();
    expect(element.text()).toBe('Old content');
  });

  it('should replace with a single template the entire element', function () {
    element = angular.element('<feature-flip template="<div>New content</div>" condition="true"><div>Old content</div><div>More old content</div></feature-flip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('New content');
  });

});
