'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:OmbudsmanCtrl
 * @description
 * # OmbudsmanCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('OmbudsmanCtrl', function ($rootScope, Company,$mdDialog) {
    var vm = this;    

    vm.LoadItens = function (ev) {    
      $rootScope.promise = Company.listAllOmbudsman(function (_itens) {
        vm.itens = _itens;
        $mdDialog.hide();
      }, function (response) {
        $mdDialog.hide();
        console.log(response);
      });
    }
    
  });
