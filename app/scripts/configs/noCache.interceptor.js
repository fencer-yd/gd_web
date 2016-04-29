/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';
(function(){

	var noCacheInterceptor = function(){
		return {
			request: function (config) {
				var reg = /template/;
				if (config.method == 'GET' && !reg.test(config.url)) {
					var separator = config.url.indexOf('?') === -1 ? '?' : '&';
					config.url = config.url + separator + 'noCache=' + new Date().getTime();
				}
				return config;
			}
		};
	};

	noCacheInterceptor.$inject = [];

	angular.module('noCacheInterceptor',[])
		.factory('noCacheInterceptor',noCacheInterceptor);

})();