'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('MainCtrl', function (Authentication, $location, $mdSidenav, $mdMedia, $mdDialog, materialAlert) {

    var vm = this;

    vm.isLoading =  materialAlert.loading;
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;

    
    this.IsLoggedIn = function () {
      return Authentication.isLoggedIn();
    };

    this.getLogin = function(){

      return Authentication.getLogin();
    };
    
    if (!this.IsLoggedIn()){
      $location.path('/login');
    }

    this.toggleSideNav = function () {
      $mdSidenav('left')
        .toggle()
        .then(function () {
        });
    };
    
    this.closeSideNav = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close();
    };
    this.Logout = function(){
      if(!confirm("Deseja sair da sua conta?")){
        return;
      }
      Authentication.doLogout();
      $location.path('login');
    };    
  });
