/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';
(function(){

	var httpConfig = function($httpProvider){
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		$httpProvider.interceptors.push('noCacheInterceptor');
		$httpProvider.interceptors.push('httpInterceptor');
	};

	httpConfig.$inject = ['$httpProvider'];

	angular.module('httpConfig',[])
		.config(httpConfig);

})();