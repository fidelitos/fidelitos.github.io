'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('LoginCtrl', function (apiUrl, Authentication,Notification, $location, Company,Client,materialAlert) {
    var vm = this;
    vm.erro = '';
    vm.loading = false;    
    vm.counter = 120;
    vm.btGerar = false;
    vm.btEntrar = false;
    vm.btHaveCode = true;
    vm.btHaveCodeClicked = false;

    vm.cadastro = {
      Password: '',
      ConfirmPassword:'',
      Name:'',
      Email:'',
      CellPhone: ''};

    vm.submitClient = function(){
      vm.loading = true;
      Authentication.doLogin(vm.cellphone, vm.password, function(){
        $location.path('/settings');
      }, function(response){
        vm.loading = false;
        materialAlert.toast('Login e/ou senha incorretos!');
        console.log(response);
      });
    };

    vm.generateAccess = function(){
        if(!confirm("Deseja receber o código de acesso via SMS?")){
          return;
        }

        vm.loading = true;
        Notification.doNotifCodeAcessSMS(vm.cellphone, function(){
          vm.loading = false;          
          materialAlert.toast('Código de acesso gerado com sucesso! Favor aguardar o recebimento do SMS');
          vm.counter = 120;
          $('#div_temp_counter').show();
          vm.btHaveCode = true;   
          vm.btHaveCodeClicked = true;
          updateCounter();

        }, function(response){
          vm.loading = false;
          materialAlert.toast('Houve um problema ao gerar o código de acesso! Tente mais tarde');
          console.log(response);
        });
    };    

    var updateCounter = function() {
          vm.counter--;          
          $('#temp_counter').text(vm.counter);
          if( vm.counter > 1){
            setTimeout(updateCounter, 1000);
          }else{
            $('#div_temp_counter').hide();
            vm.btHaveCodeClicked = false;
          }
    };
        

  });
