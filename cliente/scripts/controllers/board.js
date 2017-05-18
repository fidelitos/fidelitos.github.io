'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('BoardCtrl', function (Company, materialAlert) {
    var vm = this;
    vm.cadastro = {};

    vm.Update = function(){
        Company.updateInfo(vm.cadastro, function(){
            materialAlert.toast('Informações atualizadas com sucesso!');
        }, function(response){
            //alert('erro!');
            console.log(response);
        });
    };

    function Load(){
        Company.getInfo(function(company){
            vm.cadastro = company;
        }, function(response){
            //alert('erro');
            console.log(response);
        });
    }
    Load();
  });
