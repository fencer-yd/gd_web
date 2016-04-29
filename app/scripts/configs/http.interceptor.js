/**
 * Created by yangdeng on 16/4/26.
 */
'use strict';

(function () {

	var httpInterceptor = function ($cookies, toaster, $timeout, $q) {
		return {
			request: function (config) {
				return config;
			},
			responseError: function (response) {
				switch (response.status) {
					case 401:
						if ($cookies.isLogin) {
							toaster.error('警告!', ' 您的账户被修改，请重新登录,5秒后返回登录页面');
							$timeout(function () {
								$location.path('/login');
								$cookies.isLogin = false;
							}, 5000);
						}
						return $q.reject(response);
						break;
					case 503:
						toaster.warning("警告", "服务端异常,请联系管理员");
						return $q.reject(response);
						break;
					case 404:
						toaster.error("错误", "访问地址不存在,请联系管理员");
						return $q.reject(response);
						break;
					case 400:
						toaster.warning('警告', '账户信息错误');
						return $q.reject(response);
						break;
					default:
						toaster.warning('警告', '未知错误');
						return $q.reject(response);
						break;

				}
			}
		}
	};

	httpInterceptor.$inject = ['$cookies', 'toaster', '$timeout', '$q'];

	angular.module('httpInterceptor', [])
		.factory('httpInterceptor', httpInterceptor);

})();