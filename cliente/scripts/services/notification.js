'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.Authentication
 * @description
 * # Authentication
 * Service in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
  .service('Notification', Notification);  
  function Notification($http, apiUrl) {
    var api = apiUrl + 'api/Client/';
    return {
        doNotifCodeAcessSMS: function(cellPhone, sucessCallback, errorCallback) {
              
            $http.get(api+'sendAcessCode?cellphone='+cellPhone).then(function (response) { 
                    console.log(response);
                    sucessCallback(response.data.content);          
              },function(response){
                    console.log(response);
                    errorCallback(response);
                }
            );

            }        
    };
  }
