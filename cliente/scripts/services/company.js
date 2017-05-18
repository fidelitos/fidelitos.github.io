'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.Company
 * @description
 * # Company
 * Service in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
  .service('Company', function ($http, apiUrl) {
    return {
      Create: function(objCompany, createSuccess, createError){
        function successCallBack(response) {
            createSuccess(response);
        }

        function errorCallBack(response) {
          if(response.status !== -1){
            createError(response);
          }
        }
        
        $http.post(apiUrl+'api/Account/RegisterCompany', objCompany).then(successCallBack, errorCallBack);

      },
      listAllOmbudsman: function(sucessCallback, errorCallback){
          $http.get(apiUrl+'api/Company/'+'listOmbudsmanCompany').then(function (response) { 
          sucessCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        });
      },
      getInfo: function(successCallback, errorCallback){
        $http.get(apiUrl+'api/Company/findInfoCompany').then(function (response) { 
          successCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        }); 
      },
      updateInfo: function(company, successCallback, errorCallback){
        $http.post(apiUrl + 'api/Company/RegisterInfoCompany', company)
        .then(successCallback, errorCallback);
      }

    };
  });
