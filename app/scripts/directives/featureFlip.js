'use strict';

angular.module('leanTodoApp')
  .directive('featureFlip', function ($templateCache) {
    return {
      restrict: 'E',
	  scope: {
		condition: '&condition' // one way binding
	  },
      link: function (scope, element, attrs) {
		  if (!!attrs.template) {
			  if (scope.condition()) { // scope.condition is read-only, so we have to call condition() function
				element.children().remove();
				element.append(attrs.template);
			  }
		  }
		  else if (!!attrs.templateUrl) {
			  if(scope.condition()) {
				var template = $templateCache.get(attrs.templateUrl);
				element.children().remove();
				element.append(template);
			  }
		  }
      }
    };
  });
