'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:OmbudsmanCtrl
 * @description
 * # OmbudsmanCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('OmbudsmanCtrl', function (Company) {
    var vm = this;
    

    function LoadItens() {
      Company.listAllOmbudsman(function (_itens) {
        vm.itens = _itens;
      }, function (response) {
        //alert('erro');
        console.log(response);
      });
    }

    LoadItens();
  });
