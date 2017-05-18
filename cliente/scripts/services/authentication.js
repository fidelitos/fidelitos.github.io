'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.Authentication
 * @description
 * # Authentication
 * Service in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
  .service('Authentication', Authentication);

  function Authentication($http, apiUrl) {
    return {
        doLogin: function(login, password, authSuccess, authError) {
                var data = angular.toJson({
                    grant_type: 'password'
                    ,username: login
                    ,password: password
                });

                var parameters = 'grant_type=password&username='+login+'&password='+password;

                $http.post(apiUrl+'Token', parameters).then(successCallBack, errorCallBack);                

                function successCallBack(response) {
                    localStorage.setItem('login', login);
                    localStorage.setItem('token', response.data.access_token);
                    authSuccess();
                }

                function errorCallBack(response) {
                  if(response.status != -1)
                    authError(response);
                }
            },
        isLoggedIn: function() {
            return (!(localStorage.getItem('token') === null) 
            && !(localStorage.getItem('login') === null))
        },
        doLogout: function() {
            localStorage.removeItem('token');
            localStorage.removeItem('login');
        },
        getLogin: function() {
            return localStorage.getItem("login");
        }
    };
  }
