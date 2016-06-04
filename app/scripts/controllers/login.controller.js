'use strict';

/**
 * @ngdoc function
 * @name webProjectApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webProjectApp
 */

(function () {

    var rigistCtrl = function (commonService, rigistService, $timeout, $scope, toaster) {

        var _self = this;

        _self.putData = {};

        _self.error = {};

        _self.checkData = {};

        _self.rigist = function () {
            console.log(_self.putData);
        };

        _self.reset = function () {
            _self.putData = {};
            _self.error = {};
            _self.checkData = {};
            _self.readyCN = false;
            _self.readyDo = false;
        };

        _self.checkCompanyName = function () {
            _self.readyCN = true;
            _self.checkData.checkCNResult = null;

            if (_self.putData.companyName) {
                _self.putData.companyName = commonService.trim(_self.putData.companyName);
                rigistService.checkCompanyName(_self.putData.companyName).success(function (res) {
                    if (res.code == 200) {
                        _self.checkData.checkCNResult = 'aa';
                        $timeout(function () {
                            _self.checkData.checkCNResult = 'true';
                        }, 3000);
                    }
                    else if (res.code == 201) {
                        _self.checkData.checkCNResult = 'aa';
                        $timeout(function () {
                            _self.checkData.checkCNResult = 'false';
                            _self.error.companyName = res.msg;
                        }, 3000);

                    }
                });
            }
            else {
                _self.checkData.checkCNResult = 'false';
                _self.error.companyName = '公司域名不能为空';
            }
        };

        _self.checkDomain = function () {
            _self.readyDo = true;
            _self.checkData.checkDoResult = null;

            if (_self.putData.domain) {
                _self.putData.domain = commonService.trim(_self.putData.domain);
                rigistService.checkDomain(_self.putData.domain).success(function (res) {
                    if (res.code == 200) {
                        _self.checkData.checkDoResult = 'aa';
                        $timeout(function () {
                            _self.checkData.checkDoResult = 'true';
                        }, 3000);
                    }
                    else if (res.code == 201) {
                        _self.checkData.checkDoResult = 'aa';
                        $timeout(function () {
                            _self.checkData.checkDoResult = 'false';
                            _self.error.domain = res.msg;
                        }, 3000);
                    }
                });
            }
            else {
                _self.checkData.checkDoResult = 'false';
                _self.error.domain = '公司域名不能为空';
            }
        };

        _self.checkAll = function () {
            _self.readyCN = true;
            _self.readyDo = true;
            if (_self.putData.companyName) {
                _self.checkData.checkCNResult = 'true';
                _self.putData.companyName = commonService.trim(_self.putData.companyName);
            }
            else {
                _self.checkData.checkCNResult = 'false';
                _self.error.companyName = '公司域名不能为空';
            }
            if (_self.putData.domain) {
                _self.checkData.checkDoResult = 'true';
                _self.putData.domain = commonService.trim(_self.putData.domain);
            }
            else {
                _self.checkData.checkDoResult = 'false';
                _self.error.domain = '公司域名不能为空';
            }
            if (_self.putData.release) {
            }
            else {
                _self.checkData.checkReleaseResult = 'false';
                _self.error.release = '版本不能为空';
            }
            if (commonService.trim(_self.putData.username)) {
                _self.putData.username = commonService.trim(_self.putData.username);
            }
            else {
                _self.checkData.checkUsernameResult = 'false';
                _self.error.username = '用户名不能为空';
            }
            if (_self.putData.password) {
                if (_self.putData && _self.putData.tPassword) {
                    if (_self.putData.password == _self.putData.tPassword) {
                    }
                    else {
                        _self.checkData.checkTPasswordResult = 'false';
                        _self.error.tPassword = '两次密码输入不一致';
                    }
                }
                else {
                    _self.checkData.checkTPasswordResult = 'false';
                    _self.error.tPassword = '第二次输入密码不能为空';
                }
            }
            else {
                _self.checkData.checkPasswordResult = 'false';
                _self.error.password = '密码输入不能为空';
            }
        };

        _self.rigist = function () {
            _self.error = {};
            _self.checkData = {};
            _self.checkAll();
            var putData = {
                "companyName": _self.putData.companyName,
                "domain": _self.putData.domain,
                "release": _self.putData.release,
                "deadLine": 0,
                "username": _self.putData.username,
                "password": _self.putData.password,
                "mobile": "",
                "name": _self.putData.name,
                "status": 1
            };
            rigistService.rigist(putData).success(function (res) {
                toaster.success('注册成功', '成功');
                $scope.$hide();
            }).error(function (res) {
                console.log(res);
            });
        };
    };

    rigistCtrl.$inject = ['commonService', 'rigistService', '$timeout', '$scope', 'toaster'];

    var loginCtrl = function ($modal, commonService, rigistService, $state, $cookies, $rootScope) {

        var _self = this;

        $rootScope.isHide = true;

        _self.rigist = function () {
            $modal({
                templateUrl: '../../views/modal/rigist.modal.html',
                backdrop: 'static',
                placement: 'center',
                show: true,
                animation: 'am-fade-and-slide-top',
                controller: 'rigistCtrl',
                controllerAs: 'rigist'
            });
        };

        _self.login = function () {
            _self.isError = false;
            _self.errorTip = '';
            if (_self.domain && _self.username && _self.password) {
                var putData = {
                    domain: commonService.trim(_self.domain),
                    username: commonService.trim(_self.username),
                    password: _self.password
                };

                rigistService.login(putData).success(function (res) {
                    console.log(res);
                    if (res.code === 0) {

                        $cookies.put('isLogin_pyq', true);
                        $cookies.put('username', res.value.username);
                        $cookies.put('userId', res.value.id);
                        $cookies.put('tenantId', res.value.tenant);
                        $cookies.put('role_pyq', res.value.role);
                        $cookies.put('JSESSIONID', res.value.token);
                        $cookies.put('realname', res.value.name);
                        $rootScope.isHide = false;
                        $state.go('main');
                    }
                    else if (res.code == -1) {
                        _self.isError = true;
                        _self.errorTip = '域名或用户名或密码错误';
                    }
                });
            }
            else {
                _self.isError = true;
                _self.errorTip = '域名和用户名和密码不能为空';
            }
        };


        _self.enterLogin = function (e) {
            e.stopPropagation();
            if (e && e.keyCode == 13) {
                _self.login();
            }
        }

    };

    loginCtrl.$inject = ['$modal', 'commonService', 'rigistService', '$state', '$cookies', '$rootScope'];

    angular.module('loginCtrl', [])
        .controller('loginCtrl', loginCtrl)
        .controller('rigistCtrl', rigistCtrl);

})();
