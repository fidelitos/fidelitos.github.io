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
function ($scope, Card, $mdDialog, materialAlert) {
  var vm = this;
  vm.cards = [];
  vm.cadastro = {};
  vm.editing = false; 
   

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

  vm.LoadCards = function (ev) {
    $mdDialog.show({
      contentElement: '#divProgress',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false
    });

    Card.listAll(function (_cards) {
      vm.cards = _cards;
       $mdDialog.hide();
    }, function (response) {
      $mdDialog.hide();
      console.log(response);
    });
  }
  vm.LoadCards();
});

