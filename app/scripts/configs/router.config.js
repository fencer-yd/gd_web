/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';
(function () {

	var router = function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("/main");

		$stateProvider

			.state('main', {
				url: '/main',
				templateUrl: 'views/main.html',
				controller: 'mainCtrl',
				controllerAs: 'main'
			})
			.state('main.form', {
				url: '/:listId/:itemId',
				templateUrl: 'views/formList.html',
				controller: 'formListCtrl',
				controllerAs: 'form'
			})

			.state('login', {
				url: "/login",
				templateUrl: 'views/login.html',
				controller: 'loginCtrl',
				controllerAs: 'login'
			});
	};

	router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	angular.module('routerConfig', [])
		.config(router);

})();