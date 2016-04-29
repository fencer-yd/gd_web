'use strict';

/**
 * @ngdoc function
 * @name webProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webProjectApp
 */

(function () {

	var mainCtrl = function ($scope, $state, $timeout) {

		var _self = this;

		_self.listId = $state.params.listId;

		_self.itemId = $state.params.itemId;

		_self.arrayList = [
			{
				id: 0,
				children: [
					{
						id: 0,
						name: '第1条'
					}, {
						id: 1,
						name: '第2条'
					}, {
						id: 2,
						name: '第3条'
					}, {
						id: 3,
						name: '第4条'
					}
				],
				name: '第1条'
			},
			{
				id: 1,
				children: [
					{
						id: 0,
						name: '第1条'
					}, {
						id: 1,
						name: '第2条'
					}, {
						id: 2,
						name: '第3条'
					}, {
						id: 3,
						name: '第4条'
					}
				],
				name: '第2条'
			},
			{
				id: 2,
				children: [
					{
						id: 0,
						name: '第1条'
					}, {
						id: 1,
						name: '第2条'
					}, {
						id: 2,
						name: '第3条'
					}, {
						id: 3,
						name: '第4条'
					}
				],
				name: '第3条'
			},
			{
				id: 3,
				children: [
					{
						id: 0,
						name: '第1条'
					}, {
						id: 1,
						name: '第2条'
					}, {
						id: 2,
						name: '第3条'
					}, {
						id: 3,
						name: '第4条'
					}
				],
				name: '第4条'
			},
			{
				id: 4,
				children: [
					{
						id: 0,
						name: '第1条'
					}, {
						id: 1,
						name: '第2条'
					}, {
						id: 2,
						name: '第3条'
					}, {
						id: 3,
						name: '第4条'
					}
				],
				name: '第5条'
			},
			{
				id: 5,
				children: [
					{
						id: 0,
						name: '第1条'
					}, {
						id: 1,
						name: '第2条'
					}, {
						id: 2,
						name: '第3条'
					}, {
						id: 3,
						name: '第4条'
					}
				],
				name: '第6条'
			}
		];

		_self.chooseList = function (list, e) {
			if (e) {
				e.stopPropagation();
			}
			angular.forEach(_self.arrayList, function (n) {
				if (n.id != list.id && n.isShow) {
					$('#collapse' + n.id).slideUp(500);
					$timeout(function () {
						n.isShow = false;
					}, 500);
				}
			});
			if (!list.isShow) {
				$('#collapse' + list.id).slideDown(500);
				$timeout(function () {
					list.isShow = true;
				}, 500);
			}
			else {
				$('#collapse' + list.id).slideUp(500);
				$timeout(function () {
					list.isShow = false;
				}, 500);
			}

		};

		var hasIn = true;

		angular.forEach(_self.arrayList, function (n) {
			if (_self.listId == n.id) {
				_self.thisList = n;
				$timeout(function(){
					_self.chooseList(n);
				});
				angular.forEach(n.children, function (i) {
					if (_self.itemId == i.id) {
						_self.thisItem = i;
						hasIn = true;
					}
				});
			}
		});

		if (hasIn) {
			$state.go('main.form', {
				listId: _self.listId,
				itemId: _self.itemId
			});
		}
		else {
			_self.thisList = _self.arrayList[0];
			$timeout(function(){
				_self.chooseList(_self.thisList);
			});
			_self.thisItem = _self.arrayList[0].children[0];
			$state.go('main.form', {
				listId: _self.arrayList[0].id,
				itemId: _self.arrayList[0].children[0].id
			});
		}



		_self.chooseItem = function (e, list, item) {
			e.stopPropagation();
			_self.thisList = list;
			_self.thisItem = item;

			$state.go('main.form', {
				listId: list.id,
				itemId: item.id
			});
		};

	};

	mainCtrl.$Inject = ['$scope', '$state', '$timeout'];

	angular.module('mainCtrl', [])
		.controller('mainCtrl', mainCtrl);

})();
