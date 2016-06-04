/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';
(function(){

	var commonService = function($q,mainService){

    var _self = this;

    _self.companyMap = {};

      this.trim = function(str){
			if(str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}
			else{
				return '';
			}
		};

    this.getCompanyCache = function(){
      var pro = $q.defer();
      if(_.keys(_self.companyMap) && _.keys(_self.companyMap).length > 0){
        pro.resolve(_self.companyMap);
      }
      else{
        mainService.getCompanyName().success(function(res){
          if(res && res.code == 200){
            var userMap = {};
            angular.forEach(res.value,function(n){
              userMap[n.id] = n.name;
            });
            _self.companyMap = angular.copy(userMap);
            pro.resolve(_self.companyMap);
          }
          else{
            pro.resolve(_self.companyMap);
          }
        });
      }
      return pro.promise;
    };

	};

	commonService.$inject = ['$q','mainService'];

	angular.module('commonService',[])
		.service('commonService',commonService);

})();
