/**
 * Created by yangdeng on 16/4/29.
 */
'use strict';
(function () {

	var mainService = function ($http) {

	};

	mainService.$inject = ['$http'];

	angular.module('mainService',[])
		.service('mainService',mainService);

})();