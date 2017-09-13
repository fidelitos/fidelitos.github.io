'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('MainCtrl', function (Authentication,$routeParams, $location, $mdSidenav, $mdMedia, materialAlert, Company, Client, $mdDialog) {

    var vm = this;
    vm.company = null;

    vm.isLoading = materialAlert.loading;
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;

    if($routeParams.ativacao_cancelamento){
      if($routeParams.ativacao_cancelamento == "ativacao"){
           $mdDialog.show({
              contentElement: '#divAdesao',
              parent: angular.element(document.body),
              targetEvent: null,
              clickOutsideToClose: true
            }).finally(function(){          
           });
      }

      if($routeParams.ativacao_cancelamento == "cancelamento"){        
         $mdDialog.show({
              contentElement: '#divCancelamento',
              parent: angular.element(document.body),
              targetEvent: null,
              clickOutsideToClose: true
            }).finally(function(){          
           });
      }

    }
    

    this.IsLoggedIn = function () {
      return Authentication.isLoggedIn();
    };

   

    this.getLogin = function () {
      return Authentication.getLogin();
    };

    if (!this.IsLoggedIn()) {
      $location.path('/login');
    }

    this.toggleSideNav = function () {
      $mdSidenav('left')
        .toggle()
        .then(function () {
        });
    };

    
    this.Logout = function () {
      Authentication.doLogout();
      $location.path('login');
    };

    this.ShowPagSeguro = function (ev) {
        $mdDialog.show({
          contentElement: '#divPagamento',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        }).finally(function(){
          
        });
    };

    this.closeSideNav = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close();
    };

    if (vm.company === null) {
      Company.getInfo(function (company) {
        vm.company = company;
        try{
              var oneDay = 24*60*60*1000;
              var today = new Date(vm.company.record_date);
              today.setDate(today.getDate()+vm.company.period_test_max);
              var days = Math.round(Math.abs((today.getTime() - new Date().getTime())/(oneDay)));
              vm.company.days = days;


            var menuP = {
              link: '',
              method: vm.ShowPagSeguro,
              color: '#f94538',
              title: 'Ativar Conta',
              icon: 'payment'
            };

            if(!vm.company.signed){
              vm.menu.push(menuP);
            }

        }catch(e){}


        $("#idCompnay").val(company.id);
        $("#logo").attr("src", company.link_image_little);
        $("#nameCompany").html(company.name);

      }, function (response) {
        console.log(response);
      });
    }

    vm.menu = [
      {
        link: '/card',
        title: 'Campanhas Promocionais',
        icon: 'redeem'
      },
      {
        link: '/client',
        title: 'Clientes',
        icon: 'group'
      },
      {
        link: '/settings',
        title: 'Meus Dados',
        icon: 'account_box'
      },
      {
        link: '/board',
        title: 'Mural',
        icon: 'dashboard'
      },
      {
        link: '/ombudsman',
        title: 'Ouvidoria',
        icon: 'record_voice_over'
      },
      {
        link: '/dashboard',
        title: 'Dashboard',
        icon: 'assessment'
      },     
      {
        link: '',
        method: this.Logout,
        title: 'Sair',
        icon: 'exit_to_app'
      }

    ];

  });
