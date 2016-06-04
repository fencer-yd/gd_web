/**
 * Created by yangdeng on 16/4/26.
 */

'use strict';

(function () {

	var init = function ($rootScope, $cookies, $state , $location) {

		$rootScope.$watch(function(){
			return $cookies.get('isLogin_pyq');
		}, function () {
			if (!$cookies.get('isLogin_pyq')) {
				$state.go('login');
			}
		},true);

	};

	init.$inject = ['$rootScope', '$cookies', '$state' , '$location'];

	angular.module('webProjectApp')
		.run(init).directive('wbgSelect', ['$timeout', '$filter', function ($timeout, $filter) {
      return {
        restrict: 'A',
        require: 'ngModel',
        templateUrl: '../libs/views/directives/wbgSelectDirective.html',
        replace: true,
        scope: {
          orgTree: '=orgTree',
          innerItems: '=ngModel',
          allOrgs: '=allOrgs',
          allContacts: '=allContacts',
          allUserGroup: '=allUserGroup',
          formOtherSelectedData: '=formOtherSelectedData',
          allUser: '=allUser'
        },
        link: function (scope, element, attr, ctrl) {
          scope.updateModel = function (item) {
            ctrl.$setViewValue(item);
          };
          ctrl.$viewChangeListeners.push(function () {
            scope.$eval(attr.ngChange);
          });
          var options = scope.options = {
            placeholder: '请选择',
            trigger: 'focus'
          };
          var attrGet = function () {
            angular.forEach(['selectType', 'multiple', 'maxLength', 'placeholder', 'closeOnSelect', 'trigger'], function (key) {
              if (angular.isDefined(attr[key])) options[key] = attr[key];
            });
          };
          attrGet();

          scope.timeStr = new Date().getTime();
          scope.childShowDp = [];
          scope.searchText = '';
          scope.selectItems = [];
          scope.showDropdown = false;
          scope.$watch('orgTree', function () {
            if (scope.orgTree) {
              var company = angular.copy(scope.orgTree);
              company.children = false;
              company.level = 1;
              scope.thisOrgTree = [company];
              scope.thisOrgTree = scope.thisOrgTree.concat(scope.orgTree.children)
            }
          });
          scope.$watch('options.multiple', function () {
            if (options.multiple) {
              if (scope.innerItems) {
                scope.innerItems = angular.isArray(scope.innerItems) ? scope.innerItems : [scope.innerItems]
              }
            } else {
              if (scope.innerItems) {
                scope.innerItems = angular.isArray(scope.innerItems) ? scope.innerItems[0] : scope.innerItems;
              }
            }
          })

          scope.isEmpty = function (obj) {
            return !!(!obj || obj == undefined || obj == '' || obj == null || obj.length <= 0);
          };
          scope.isInArray = function (value, array) {
            var res = -1;
            if (array && array.length > 0) {
              for (var i = 0; i < array.length; i++) {
                if (array[i] == value) {
                  res = i
                }
              }
            }
            return res;
          };

          scope.isInAllUerGruopArray = function (value, array) {
            var res = -1;
            if (array && array.length > 0) {
              for (var i = 0; i < array.length; i++) {
                if (array[i].id == value.id && array[i].type == value.type) {
                  res = i;
                }
              }
            }
            return res;
          }
          scope.itemTrans = function (id) {
            var items = [];
            var res = '';
            if (options.selectType == 'contactSelect') {
              items = scope.allContacts
            }
            else if (options.selectType == 'formDataSelect') {
              items = scope.formOtherSelectedData;
            }
            else if (options.selectType == 'userSelect') {
              items = scope.allUser;
            }
            else if (options.selectType == 'allUserGroupType') {
              items = scope.allUserGroup;
            }
            else {
              items = scope.allOrgs
            }
            if (options.selectType == 'allUserGroupType') {
              angular.forEach(items, function (item) {
                if (item.id == id.id && item.type == id.type) {
                  res = item.name;
                }
              });
            }
            else {
              angular.forEach(items, function (item) {
                if (item.id == id) {
                  res = item.fullname
                }
              });
            }
            return res;
          };
          scope.dropdownShow = function () {
            attrGet();
            scope.childShowDp = [];
            scope.showDropdown = !scope.showDropdown;
            $timeout(function () {
              if (scope.showDropdown) {
                angular.element('#wbg-search-input-' + scope.timeStr).focus();
              }
            }, 10)

          };
          scope.searchInputBlur = function () {
            $timeout(function () {
              if (options.trigger == 'focus' && !angular.element('#wbg-search-input-' + scope.timeStr).is(":focus")) {
                scope.showDropdown = false;
              }
            }, 200)
          };
          scope.triangleClick = function (dp) {
            scope.childShowDp[dp.id] = !scope.childShowDp[dp.id];
            angular.element('#wbg-search-input-' + scope.timeStr).focus();
          };
          scope.itemClick = function (item) {
            if (options.multiple) {
              if (scope.innerItems) {
                scope.innerItems = angular.isArray(scope.innerItems) ? scope.innerItems : [scope.innerItems];
              } else {
                scope.innerItems = []
              }
            }
            angular.element('#wbg-search-input-' + scope.timeStr).focus();
            if (options.multiple) {
              if (options.selectType == 'allUserGroupType') {
                var index = scope.isInAllUerGruopArray(item, scope.innerItems);
                if (index < 0) {
                  if (!options.maxLength || scope.innerItems.length < options.maxLength) {
                    scope.innerItems.push(item);
                  }
                } else {
                  scope.innerItems.splice(index, 1);
                }
              }
              else {
                var index = scope.isInArray(item.id, scope.innerItems);
                if (index < 0) {
                  if (!options.maxLength || scope.innerItems.length < options.maxLength) {
                    scope.innerItems.push(item.id);
                  }
                } else {
                  scope.innerItems.splice(index, 1);
                }
                if (options.closeOnSelect) {
                  $timeout(function () {
                    scope.showDropdown = false;
                  }, 300);
                }
              }
            } else {
              scope.innerItems = item.id;
              $timeout(function () {
                scope.showDropdown = false;
              }, 300);
            }
            scope.updateModel(scope.innerItems)
          };
          scope.itemRm = function (itemId, e) {
            e.stopPropagation();
            angular.element('#wbg-search-input-' + scope.timeStr).focus();
            if (options.selectType == 'allUserGroupType') {
              var index = scope.isInAllUerGruopArray(itemId, scope.innerItems);
            }
            else {
              var index = scope.isInArray(itemId, scope.innerItems);
            }
            if (index > -1) {
              scope.innerItems.splice(index, 1)
            }
            scope.updateModel(scope.innerItems)
          }
        }
      }
    }]);;

})();
