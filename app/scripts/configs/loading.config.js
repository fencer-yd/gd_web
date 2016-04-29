/**
 * Loader animation
 * @author shanshouchen@haizhi.com
 * @version 1.0
 *
 */
angular.module('agencyLoaderTemplates', ['template/ngLoader/ngLoaderTemplate.html']);

angular.module('template/ngLoader/ngLoaderTemplate.html', []).run(['$templateCache',
	function($templateCache) {
		$templateCache.put('template/ngLoader/ngLoaderTemplate.html',
			"<div class=\"loader\" data-ng-show=\"working\" style=\"position: absolute;top: 0px;bottom: 0px;left: 0px;right: 0px;height: 100% !important;width: 100% !important;\">\n" +
			"  <div class=\"loader-content\" style=\"position: absolute;top: 50%;left: 50%;line-height: 1;max-width: 50%;padding: 7px;-o-border-radius: 5px;border-radius: 5px;background-color: rgba(0, 0, 0, 0.5);color: #ffffff;text-transform: uppercase;text-align: center;word-break: break-word;z-index: 1;\">\n" +
			"    <svg version=\"1.1\" id=\"loader\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n" +
			"     width=\"50px\" height=\"25px\" viewBox=\"0 0 24 30\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n" +
			"      <rect x=\"0\" y=\"13\" width=\"4\" height=\"5\" fill=\"#FFFFFF\">\n" +
			"        <animate attributeName=\"height\" attributeType=\"XML\"\n" +
			"          values=\"5;21;5\" \n" +
			"          begin=\"0s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
			"        <animate attributeName=\"y\" attributeType=\"XML\"\n" +
			"          values=\"13; 5; 13\"\n" +
			"          begin=\"0s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
			"      </rect>\n" +
			"      <rect x=\"10\" y=\"13\" width=\"4\" height=\"5\" fill=\"#FFFFFF\">\n" +
			"        <animate attributeName=\"height\" attributeType=\"XML\"\n" +
			"          values=\"5;21;5\" \n" +
			"          begin=\"0.15s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
			"        <animate attributeName=\"y\" attributeType=\"XML\"\n" +
			"          values=\"13; 5; 13\"\n" +
			"          begin=\"0.15s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
			"      </rect>\n" +
			"      <rect x=\"20\" y=\"13\" width=\"4\" height=\"5\" fill=\"#FFFFFF\">\n" +
			"        <animate attributeName=\"height\" attributeType=\"XML\"\n" +
			"          values=\"5;21;5\" \n" +
			"          begin=\"0.3s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
			"        <animate attributeName=\"y\" attributeType=\"XML\"\n" +
			"          values=\"13; 5; 13\"\n" +
			"          begin=\"0.3s\" dur=\"0.6s\" repeatCount=\"indefinite\" />\n" +
			"      </rect>\n" +
			"    </svg>\n" +
			"    <p style=\"margin: 2px 0px;\" data-ng-bind=\"message\" data-ng-cloak data-ng-show=\"message\"></p>\n" +
			"  </div>\n" +
			"</div>");
	}]);

angular.module('agencyLoader', ['agencyLoaderTemplates'])
	.directive('loader', ['$timeout','$log',
		function($timeout,$log) {
			return {
				scope: {
					working: '=',
					message: '@',
					disableBackground: '@'
				},
				restrict: 'AE',
				replace: true,
				templateUrl: function(tElem, tAttrs) {
					return 'template/ngLoader/ngLoaderTemplate.html';
				},
				link: function(scope, elem, attrs) {
					if (attrs.disableBackground == 'true') {
						elem.css({
							'background': 'rgba(240,240,240,0.25)',
							'z-index': '9999'
						});
					}
					else if (attrs.disableBackground === undefined) {}
					else {
						$log.error('Directive Error! Attribute \'disable-background\' must be \'true\' for \'false\'. Found \'' + attrs.disableBackground + '\'');
					}
					var content = elem.find('div')[0];
					$timeout(function() {
						content.style.marginTop = -(content.offsetHeight / 2)+'px';
						content.style.marginLeft = -(content.offsetWidth / 2)+'px';
					});
				}
			};
		}]);