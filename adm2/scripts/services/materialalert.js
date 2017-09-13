'use strict';

/**
 * @ngdoc service
 * @name fidelitosadmApp.materialAlert
 * @description
 * # materialAlert
 * Service in the fidelitosadmApp.
 */
angular.module('fidelitosadmApp')
  .service('materialAlert', function ($mdDialog, $mdToast) {
    var vm = this;
    vm.isLoading = false;
    return {
      loading: function(set){
        vm.isLoading = set;
      },
      alert: function(title, message){
        $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(message)
        .ok('OK')
    );
      },
      toast: function(message){
        $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .position('top right' )
        .hideDelay(3000)
        );
      }
      ,
      toastErro: function(message){
        $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .action('ERRO')
        .highlightAction(true)
        .highlightClass('md-accent')
        .position('top right' )
        .hideDelay(3000)
        );
      }

      };// AngularJS will instantiate a singleton by calling "new" on this function
  });
