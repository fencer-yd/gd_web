/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';
(function(){

	var rigistService = function($http){

		this.checkCompanyName = function(name){
			return $http.get('/rest/register/validatorname?name='+ name );
		};

		this.checkDomain = function(domain){
			return $http.get('/rest/register/validatordomin?domain'+ domain );
		};

		this.login = function(data){
			return $http.post('/rest/user/login',data);
		};

		this.rigist = function(data){
			return $http.post('/rest/register/create',data);
		}

	};

	rigistService.$inject = ['$http'];

	angular.module('rigistService',[])
		.service('rigistService',rigistService);

})();