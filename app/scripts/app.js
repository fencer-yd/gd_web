'use strict';

/**
 * @ngdoc overview
 * @name webProjectApp
 * @description
 * # webProjectApp
 *
 * Main module of the application.
 */
angular
	.module('webProjectApp', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ui.router',
		'ngMessages',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'toaster',
		'mgcrea.ngStrap',
		'ui.tinymce',

		'configApp',
		'serviceApp',
		'controllerApp',
		'directiveApp',
		'filterApp'
	]);
