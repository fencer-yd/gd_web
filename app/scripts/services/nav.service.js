/**
 * Created by yangdeng on 16/4/29.
 */
'use strict';
(function () {

	var navService = function ($http) {

		this.getNavList = function (id, data) {
			return $http.get('/rest/nav/list?id=' + id, data);
		};

	};

	navService.$inject = ['$http'];

	angular.module('navService', [])
		.service('navService', navService);

})();