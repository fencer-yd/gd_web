/**
 * Created by yangdeng on 16/4/26.
 */

'use strict';

(function () {

	var init = function ($rootScope, $cookies, $state , $location) {

		$rootScope.$watch(function(){
			return $cookies.get('isLogin_pyq');
		}, function () {
			if (!$cookies.get('isLogin_pyq')) {
				$location.path('/login');
				$state.go('login');
			}
		},true);

	};

	init.$inject = ['$rootScope', '$cookies', '$state' , '$location'];

	angular.module('webProjectApp')
		.run(init);

})();