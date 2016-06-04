/**
 * Created by yangdeng on 16/4/27.
 */
'use strict';
(function(){

	var headerCtrl = function($cookies){

		var _self = this;

		_self.username = $cookies.get('realname')


		_self.logout = function(){
			$cookies.remove('isLogin_pyq');
			$cookies.remove('realname');
			$cookies.remove('JSESSIONID');
			$cookies.remove('username');
			$cookies.remove('role_pyq');

		}

	};

	headerCtrl.$inject = ['$cookies'];

	var header = function(){

		return {
			restrict:'A',
			templateUrl:'../libs/views/directives/header.html',
			controller: 'headerCtrl',
			controllerAs:'header'
		};

	};

	header.$inject = [];

	angular.module('headerDirective',[])
		.controller('headerCtrl',headerCtrl)
		.directive('header',header);

})();
