/**
 * Created by yangdeng on 16/4/29.
 */
'use strict';
(function () {

	var mainService = function ($http) {
    this.getUserMenus = function(userId){
      return $http.get('/rest/user/getMenus?userId='+ userId );
    };
    this.getMenuData = function(listId,itemId,userId,tenantId){
      return $http.get('/rest/data/?listId='+ listId + '&itemId='+ itemId +'&userId='+userId+'&tenantId='+tenantId);
    }

    this.getCompanyName = function(){
      return $http.get('/rest/company');
    };
	};
	mainService.$inject = ['$http'];
	angular.module('mainService',[])
		.service('mainService',mainService);

})();
