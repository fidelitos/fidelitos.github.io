  'use strict';

  /**
   * @ngdoc function
   * @name fidelitosadmApp.controller:ClientCtrl
   * @description
   * # ClientCtrl
   * Controller of the fidelitosadmApp
   */



  angular.module('fidelitosadmApp').controller('ClientCtrl', function ($rootScope, Client,$mdDialog,Card,materialAlert,Company, $scope, $timeout) {
    var vm = this;
    vm.achieve = [];
    vm.recording = false;
    vm.idCompany = 0;
    vm.isFabOpen = false;
    vm.showRegist = false;

    $scope.$watch('client.isFabOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.fabTooltipVisible = true;
          }, 600);
        } else {
          $scope.fabTooltipVisible = false;
        }
      });
    vm.LoadClients = function (ev) {
      $rootScope.promise = Client.listAll(function (_clients) {
        vm.clients = _clients;
        $mdDialog.hide();
      }, function (response) {
       $mdDialog.hide();
        console.log(response);
      });
    }

    vm.LoadCards = function () {
      
      $rootScope.promise = Card.listAll(function (_cards) {
        vm.cards = _cards;
      });
    }

     vm.RegisterVisit = function (ev) {  
       vm.recording = true;
      
        var dados = {cellPhoneClient: vm.achieve.cellphone, idCard : vm.achieve.idCard, score : vm.achieve.achieve};

        Client.registerVisit(dados, function(response){
              if(response.data.success === "true"){
                materialAlert.toast('Pontos registrados com sucesso!');
                $("#cellphoneDivRegistry").val("");
                 vm.achieve.cellphone = "";
                vm.recording = false;
                vm.showRegist = true;
                setTimeout(function(){vm.showRegist = false},1000);
              }else{
                alert(response.data.message);
                vm.recording = false;
              }            
          }, function(response){
              console.log(response);
          });
    };
    window.addEventListener('native.showkeyboard', keyboardShowHandler);
    function keyboardShowHandler(){
      alert("Show");
    }
    vm.OpenDialogAchieve = function ($event) {



      var parentEl = angular.element(document.body);
       vm.achieve.cellphone = "";
       vm.LoadCards();
       $("#cellphoneDivRegistry").val("");
        $mdDialog.show({
            contentElement: '#dialogRegistroPontuacao',
            parent: parentEl,
            clickOutsideToClose: true,
            targetEvent: $event
          });
    };
    

    vm.OpenDialogReward = function () {
      var confirm = $mdDialog.prompt()
        .title('Pesquisar recompensa do cliente?')
        .textContent('Celular do cliente com DDD')
        .placeholder('(##) #####-####')
        .ok('Pesquisar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function(result) {
        if(!$.isNumeric(result) || result.length !== 11){

          alert("Número do cliente invalido! verifique os 11 digitos")

        }else{

             

            $rootScope.promise = Client.getReward(result,function (reward) {
            
            if(reward != null && (typeof reward !== "undefined" ) && reward.length > 0) {
                var texto = reward[0].name +". Pontuação: "+reward[0].achieve;

                var confirm = $mdDialog.confirm()
                .title('Recompensa para '+result)
                .textContent(texto)              
                .ok('Registrar Recompensa')
                .cancel('Cancelar');                          
                                      
                   $mdDialog.show(confirm).then(function() {

                    var dados = { idCompany : $("#idCompnay").val() , idCard : reward[0].id, cellPhoneClient : result };

                    Client.registerReward(dados, function(response){
                          if(response.data.success === "true"){
                            materialAlert.toast('Recompensa registrada com sucesso!');
                            vm.recording = false;
                          }else{
                            alert(response.data.message);
                            vm.recording = false;
                          }            
                      }, function(response){
                          console.log(response);
                    });
                    
                  }, function() {});                
                }else{
                  alert("Não existe recompensa para esse cliente -"+result);
                }

                }, function() {});
            }
            }, function (response) {  
              $mdDialog.hide();           
              console.log(response);
            });      
    };

  });
