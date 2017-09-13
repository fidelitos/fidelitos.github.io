'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('BoardCtrl', function ($rootScope, Company, materialAlert, $mdDialog) {
    var vm = this;
    vm.cadastro = {};

    vm.Update = function(ev){

        $rootScope.promise = Company.updateInfo(vm.cadastro, function(){
            materialAlert.toast('Informações atualizadas com sucesso!');
        }, function(response){
            console.log(response);
        });
    };

    vm.Load = function(ev){ 
        $rootScope.promise = Company.getInfo(function(company){
            vm.cadastro = company;
        }, function(response){
            console.log(response);
        });
    }
    
  });
