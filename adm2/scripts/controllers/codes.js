'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:CodesCtrl
 * @description
 * # CodesCtrl
 * Controller of the fidelitosadmApp
 */

angular.module('fidelitosadmApp').controller('CodesCtrl', function ($rootScope, $routeParams, Company, Card, $timeout, $window, materialAlert, $mdDialog, $mdMedia) {
  var vm = this;
  vm.cardId = $routeParams.cardId;
  vm.descrAdd = "Adicionar";
  vm.descrImprimir = "Imprimir Disponíveis";
  vm.descrDisp = "Disponíveis";
  vm.descrUtil = "Utilizados";
  vm.descrTotal = "Total";  
  vm.descrComp = "Compartilhar";  

 

  if (!vm.cardId)
    alert('Código do cartão não informado!');

  vm.load = function () {
    if(!$mdMedia('gt-xs')){
        vm.descrAdd = "Add.";
        vm.descrImprimir = "Imp.";
        vm.descrDisp = "Disp.";
        vm.descrUtil = "Util.";
        vm.descrTotal = "Total";    
        vm.descrComp = "Comp.";        
    }

    vm.qtdTotal = 0;
    vm.qtdAtivos = 0;
    vm.qtdUtilizados = 0;
    $rootScope.promise = Card.getById(vm.cardId, function (card) {
      vm.card = card;
      $rootScope.promise = Company.getCardCodes(vm.cardId, 'A', function (data) {
        vm.codigos = data.visitKeyScore;
        vm.qtdAtivos = data.qtd;
        vm.qtdTotal += data.qtd;
        $rootScope.promise = Company.getCardCodes(vm.cardId, 'U', function (data) {
          vm.qtdUtilizados = data.qtd;
          vm.qtdTotal += data.qtd;
        });
      });
    });

  };

vm.imageQrShared = function (qr){
  //var t = $( "#4e9eb337e1ed491a9fbdf75b3a2bb799 canvas" ).first();
  //var data = t[0].toDataURL("image/png");
  //window.open(data);
  
}

  vm.shared = function (ev){
    if($mdMedia('gt-xs')){
      $mdDialog.show(
        $mdDialog.alert()        
          .clickOutsideToClose(true)
          .title('Compartilhar')
          .textContent('clique com o botão direito e copie a imagem.')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
          .targetEvent(ev)
      );
    }
    $( ".code-list" ).removeClass( "code-list" );
    
  }

  vm.print = function () {
    if (vm.qtdAtivos == 0) {
      materialAlert.toast('Não existem códigos ativos para impressão!');
    }
    else {
      $timeout(function () {
        $window.print();
      });
    }
  };

  vm.createCodes = function ($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      template:
      '<md-dialog flex="50" aria-label="Criar Códigos">' +

      '  <md-toolbar>'+
      '    <div class="md-toolbar-tools">'+
      '      <h2>Criar Novos Códigos</h2>'+
      '      <span flex></span>'+
      '    </div>'+
      '  </md-toolbar>'+
      '<form name="formAddCodes">'+
      '  <md-dialog-content layout-padding>' +
       '   <div layout="row">'+
       '     <md-input-container flex class="md-block">'+
       '       <label>Quantidade</label>'+
       '       <input type="number" name="qtd" ng-model="qtdToAdd" placeholder="Quantidade de códigos a serem criados"'+
       '         required="" />'+
       '       <div ng-messages="formAddCodes.qtd.$error" role="alert" multiple="">'+
       '         <div ng-message="required" class="my-message">Por favor, informe a Quantidade.</div>'+
       '       </div>'+
       '     </md-input-container>'+
       '     <md-input-container flex class="md-block">'+
       '       <label>Pontuação</label>'+
       '       <input type="number" name="score" ng-model="scoreToAdd" placeholder="Pontuação dos novos códigos"'+
       '         required="" />'+
       '       <div ng-messages="formAddCodes.score.$error" role="alert" multiple="">'+
       '         <div ng-message="required" class="my-message">Por favor, informe a Pontuação.</div>'+
       '       </div>'+
       '     </md-input-container>'+
       '   </div>'+
      '  </md-dialog-content>' +
      '  <md-dialog-actions>' +
      '    <md-button ng-disabled="!formAddCodes.$valid" ng-click="createCodes()" class="md-primary">' +
      '      Criar' +
      '    </md-button>' +
      '    <md-button ng-click="closeDialog()" class="md-primary">' +
      '      Cancelar' +
      '    </md-button>' +
      '  </md-dialog-actions>' +
      '</form>'+
      '</md-dialog>',
      controller: DialogController
    });
    function DialogController($scope, $mdDialog, materialAlert) {
      $scope.createCodes = function () {
        var param = {
          idCard: vm.cardId,
          qtd: $scope.qtdToAdd,
          score: $scope.scoreToAdd
        };
        console.log(param);
        Company.CreateCardCode(param, function () {
          vm.load();
          materialAlert.toast('Códigos gerados com sucesso!');
          $scope.closeDialog();
        }, function () {
          materialAlert.toast('Não foi possível gerar os códigos. Tente novamente ou entre em contato com a nossa equipe!');
        });
      };
      $scope.closeDialog = function () {
        $mdDialog.hide();
      }
    }
  }
}

);
