'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('CardCtrl', 
function ($rootScope, $scope, Card, Company, $mdDialog, materialAlert) {
  var vm = this;
  vm.cards = [];
  vm.cadastro = {};
  vm.editing = false;

  vm.AddCard = function (ev) {

      $rootScope.promise = Card.create(vm.cadastro, function () {
      materialAlert.toast('Novo Cartão Adicionado!');
      $mdDialog.hide();
      location.reload();      
    }, function (response) {
        $mdDialog.hide();
    });
  };

  vm.OpenCodesDialog = function (cardItem){
    vm.codes = {};
    vm.codes.qtdAtivos = 0;
    vm.codes.qtdUtilizados = 0;
    vm.codes.qtdCancelados = 0;
    vm.codes.qtdTotal = 0;
    vm.codes.idCard = cardItem.id;

    Company.getCardCodes(cardItem.id, 'A', function(data){
      vm.codes.qtdAtivos = data.qtd;
      vm.codes.qtdTotal += data.qtd;
      Company.getCardCodes(cardItem.id, 'U', function(data){
        vm.codes.qtdUtilizados = data.qtd;
        vm.codes.qtdTotal += data.qtd;

        $mdDialog.show({
          contentElement: '#CardCodesDialog',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        }).finally(function(){
          vm.codes = {};
        });    

      });
    });
    
  };
  
  vm.EditCard = function (ev) {
    $rootScope.promise = Card.edit(vm.cadastro, function () {
      materialAlert.toast('Cartão alterado com sucesso!');
      $mdDialog.hide();
      location.reload();
      
      vm.editing = false;
    }, function (response) {
       $mdDialog.hide();
    });
  };
  
  vm.Edit = function (cardItem) {
    vm.editing = true;
    vm.cadastro = cardItem;
    vm.OpenAddCardDialog();
  };

  vm.OpenAddCardDialog = function (ev) {
    if (!vm.editing){
      vm.cadastro = {};
    }
    $mdDialog.show({
      contentElement: '#addCardDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    }).finally(function(){
      vm.editing = false;
    });
  };

 vm.LoadCards = function () {  

    $rootScope.promise = Card.listAll(function (_cards) {
      vm.cards = _cards;
       $mdDialog.hide();
    }, function (response) {
       $mdDialog.hide();
      console.log(response);
    });
  }
});