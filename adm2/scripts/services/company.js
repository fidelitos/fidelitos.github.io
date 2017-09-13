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
    var companyApiUrl = apiUrl+'api/Company/';
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
        
        return $http.post(apiUrl+'api/Account/RegisterCompany', objCompany).then(successCallBack, errorCallBack);

      },
      CreateCardCode: function(params, successCallback, errorCallback){
        var method = companyApiUrl + 'generateQrCode';
        return $http.post(method, params).then(successCallback, errorCallback);
      },
      listAllOmbudsman: function(sucessCallback, errorCallback){
          return $http.get(companyApiUrl+'listOmbudsmanCompany').then(function (response) { 
          sucessCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        });
      },
      getInfo: function(successCallback, errorCallback){
        return $http.get(companyApiUrl + 'findInfoCompany').then(function (response) {           
          successCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        }); 
      },
      updateInfo: function(company, successCallback, errorCallback){
        return $http.post(companyApiUrl + 'RegisterInfoCompany', company)
        .then(successCallback, errorCallback);
      },
      getCardCodes: function(idCard, idStatus, successCallBack, errorCallback){
        return $http.get(companyApiUrl + 'consultQrCode?'
					+ 'idCard=' + idCard
					+ '&status=' + idStatus).then(function (response) {           
          successCallBack(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        }); 
      }
    };
  });
