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
      findInfoClient: function(sucessCallback, errorCallback){
          $http.get(api+'findInfoClient').then(function (response) { 
          sucessCallback(response.data.content);
          
			  }, function(response){
          errorCallback(response);
        });
      },

    registerVisit: function(key,sucessCallback, errorCallback){
         var obj = { visitkey: key, type: "", idCard: 0, idCompany: 0 };
         $http.post(apiUrl + 'api/Client/RegisterVisit', obj).then(sucessCallback, errorCallback);                    
      },

    listTimeLine: function(sucessCallback, errorCallback){
          $http.get(api+'listTimeLine?data=01/01/2017').then(function (response) { 
          sucessCallback(response.data.content);
          
        }, function(response){
          errorCallback(response);
        });
      },

     alterInfoClient: function(name,email,cellphone,cellphoneInvitation,sucessCallback, errorCallback){
       var obj = { Name: name, Email : email, Cellphone : cellphone, CellphoneInvitation : cellphoneInvitation };
        $http.post(api+'alterInfoClient',obj).then(function (response){
        sucessCallback(response.data.content);
        
      }, function(response){
        errorCallback(response);
      });
    },
    };
  });
