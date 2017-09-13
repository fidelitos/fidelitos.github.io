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
    var api = apiUrl + 'api/company/';
    return {
      listAll: function(sucessCallback, errorCallback){
          return $http.get(api+'consultCards').then(function (response) { 
          sucessCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        });
      },
      getById: function(id, successCallback, errorCallback){
        
        return this.listAll(function(cards){
          cards.forEach(function(element) {
            if(element.id == id){
              successCallback(element);
              return;
            }
          }, this);
        }, errorCallback);
        
      }
      ,create: function(card, successCallback, errorCallback){
        return $http.post(api+'RegisterCard', card).then(function (response) { 
          successCallback(response);
			  }, function(response){
          errorCallback(response);
        });
      },edit: function(card, successCallback, errorCallback){
        return $http.post(api+'updateCard', card).then(function (response) { 
          successCallback(response);
			  }, function(response){
          errorCallback(response);
        });
      }
    };
  });
