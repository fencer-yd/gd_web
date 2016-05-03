/**
 * Created by yangdeng on 16/4/29.
 */
'use strict';
(function () {

	var mainService = function ($http) {
    this.getUserMenus = function(userId){
      return $http.get('/rest/user/getMenus?userId='+ userId );
    };
    this.getMenuData = function(listId,itemId){
      return $http.get('/rest/data/?listId='+ listId + '&itemId='+itemId);
    }
	};

	mainService.$inject = ['$http'];

	angular.module('mainService',[])
		.service('mainService',mainService);

})();
