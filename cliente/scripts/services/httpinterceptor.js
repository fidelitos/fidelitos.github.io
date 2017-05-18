'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.HttpInterceptor
 * @description
 * # HttpInterceptor
 * Factory in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
	.factory('HttpInterceptor', ['$location', '$q', '$window', HttpInterceptor]);


function HttpInterceptor($location, $q, window) {
	var interceptor = {
		request: function (config) {

			config.headers = config.headers || {};
			
			if (localStorage.getItem('token'))
				config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

			return config || $q.when(config);
		}
		, response: function (res) {
			if (res.status == 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('login');
				$location.path('/login');
			} else if (res.status == -1) {
				alert('Servidor off the line!');
			}

			return res || $q.when(res);
		}
		, responseError: function (res) {
			if (res.status == 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('login');
				$location.path('/login');
			} else if (res.status == -1) {
				alert('Servidor off the line!');
			}

			return $q.reject(res);
		}
	}

	return interceptor;
}


