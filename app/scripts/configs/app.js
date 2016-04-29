/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';

(function(){

	angular.module('configApp',[
		'httpConfig',
		'httpInterceptor',
		'noCacheInterceptor',
		'routerConfig',
		'agencyLoader'
	]);

})();