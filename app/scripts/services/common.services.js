/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';
(function(){

	var commonService = function(){

		this.trim = function(str){
			if(str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}
			else{
				return '';
			}
		};


	};

	commonService.$inject = [];

	angular.module('commonService',[])
		.service('commonService',commonService);

})();