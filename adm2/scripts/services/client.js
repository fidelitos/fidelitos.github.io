'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.Client
 * @description
 * # Client
 * Service in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
  .service('Client', function (apiUrl, $http) {
    var api = apiUrl + 'api/client/';
    return {
      listAll: function(sucessCallback, errorCallback){
          return $http.get(api+'listDetailClients').then(function (response) { 
          sucessCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        });
      },

      registerVisit: function(dados, successCallback, errorCallback){
        return $http.post(apiUrl + 'api/Company/RegisterVisit', dados)
        .then(successCallback, errorCallback);
      },

      getReward: function(cellPhoneClient,sucessCallback, errorCallback){
          return $http.get(api+'findCardsReward?cellPhoneClient='+cellPhoneClient).then(function (response) { 
          sucessCallback(response.data.content);
          
        }, function(response){
          errorCallback(response);
        });
      },
      registerReward: function(dados,sucessCallback, errorCallback){
           return $http.post(apiUrl + 'api/Client/RegisterReward', dados)
           .then(sucessCallback, errorCallback);        
      }

    };
  });
