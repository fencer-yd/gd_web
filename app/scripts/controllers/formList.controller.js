/**
 * Created by yangdeng on 16/4/28.
 */
'use strict';

(function () {

	var formListCtrl = function ($state,mainService) {

		var _self = this;

		_self.thisListId =  $state.params.listId;

		_self.thisItemId = $state.params.itemId;

		//mainService.getList(_self.thisListId,_self.thisItemId).success(function(res){
		//	console.log(res);
		//	_self.tableList =  res.list;
		//	_self.tableTheadList = res.tableHeadList;
		//});


	};

	formListCtrl.$inject = ['$state','mainService'];

	angular.module('formListCtrl', [])
		.controller('formListCtrl', formListCtrl)

})();