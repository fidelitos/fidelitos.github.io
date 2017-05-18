'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.Card
 * @description
 * # Card
 * Service in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
  .service('Card', function (apiUrl, $http) {
    var api = apiUrl + 'api/Client/';
    return {
      listAll: function(sucessCallback, errorCallback){
          $http.get(api+'findCardsAssets').then(function (response) { 
          sucessCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        });
      }
    };
  });
