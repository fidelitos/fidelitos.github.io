'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('LoginCtrl', function (apiUrl, Authentication,Notification, $location, Company,materialAlert) {
    var vm = this;
    vm.selectedIndex = 0;
    vm.erro = '';
    vm.loading = false;    
    vm.counter = 120;
    vm.btGerar = false;
    vm.btEntrar = false;
    vm.btHaveCode = false;
    vm.btHaveCodeClicked = false;

    vm.cadastro = {
      Password: '',
      ConfirmPassword:'',
      Name:'',
      Email:'',
      CellPhone: '',
      submit: function(){
        vm.loading = true;
        
        if(vm.cadastro.Password !== vm.cadastro.ConfirmPassword){
          return materialAlert.toast('A senha não confere!');
        }
        
        var objCompany = {
          password: vm.cadastro.Password,
          username: vm.cadastro.Email,
          name: vm.cadastro.Name,
          email: vm.cadastro.Email,
          CellPhone: vm.cadastro.CellPhone,
          Source: 'Fidelitos'
        };

        Company.Create(objCompany, function(response){
          vm.loading = false;
          if(response.data.success){
            materialAlert.toast('Cadastro realizado com sucesso!');
            vm.email = vm.cadastro.Email;
            vm.password = vm.cadastro.Password;
            vm.selectedIndex = 0;            
            vm.submit();
          }else{           
           materialAlert.toastErro(response.data.message);
          }
        }, function(response){
          vm.loading = false;
          console.log(response);
          alert("Erro ao processar a solicitação.");
        });

      }
    };
    
    vm.submit = function(){
      vm.loading = true;
      Authentication.doLogin(vm.email, vm.password, function(){
        $location.path('/');

        setTimeout(function (){location.reload();},500);
        
      }, function(response){
        vm.loading = false;
        materialAlert.toast('Login e/ou senha incorretos!');
        console.log(response);
      });
    };


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
