'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the fidelitosadmApp
 */



angular.module('fidelitosadmApp').controller('ClientCtrl', function (Authentication,Client,$mdDialog,$scope,materialAlert) {
  var vm = this;
  $scope.timeline = [];
  vm.name = "";
  vm.email = "";
  vm.cellphone = "";
  vm.cellphoneInvitation = "";
  vm.textQr="";

  this.showQrCode = function (ev) {
      
          $mdDialog.show({ 
            contentElement: '#qrCode',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          }).finally(function(){
              
            });
    };   



  this.readImageQr = function(file){          
         qrcode.callback = function(decodedData) {          
           if(decodedData == "error decoding QR Code"){
            alert("Qrcode não encontrado na imagem\nFavor veririfcar:\nSe o qrcode não está desfocado\nSe o qrcode na imagem não está muito pequeno");              
          }else{
              Client.registerVisit(decodedData, function(response){
                if(response.data.success){
                  materialAlert.toast('Pontos realizados com sucesso!');  
                }else{
                  alert(response.data.message);  
                }
                
              }, function(response){
                alert('erro!');
                console.log(response);
             });
          }
          $mdDialog.hide();
        };
        var reader = new FileReader();
        reader.onload = function (e) {             
             qrcode.decode(e.target.result);                    
        };

         reader.readAsDataURL(file);
        $mdDialog.show({
              contentElement: '#divProgress',
              parent: angular.element(document.body),
              targetEvent: file,
              clickOutsideToClose: false
              });
    };

    this.showScan = function (ev) {

      /*
      if (window.location.protocol != "https:") {
        // window.location.protocol = "https:";
         
      }
         
         $('#divScanDialog').append( "<video height='400' width='400' id='preview'></video> " );


          $mdDialog.show({
            contentElement: '#divScan',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
              }).finally(function(){
                scanner.stop();
              
            });

            var scanner;
           scanner = new Instascan.Scanner({ video: document.getElementById('preview'),refractoryPeriod: 1000,mirror: false,backgroundScan: false });
           scanner.addListener('scan', function (content) {
            console.log(content);
            alert(content);
          });
          Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
              var camera = cameras[0];
                try{                                  
                  if(cameras[1].name.indexOf("back") > 1){
                    camera = cameras[1];
                  }
                }catch(e){}
              scanner.start(camera);
            } else {
                alert('No cameras found.');
              console.error('No cameras found.');
            }
          }).catch(function (e) {
            console.error(e);
          });*/
    };   

  this.LoadClient = function (ev) {  
    var t = vm.client;
    if(Authentication.getLogin() !== null){      
      Client.findInfoClient(function (_clients) {
        vm.client = _clients;        

         if(vm.client.name === null || vm.client.name === "" || vm.client.email === null || vm.client.email === "" || vm.client.name.indexOf(vm.client.cellphone) !== -1 || vm.client.email.indexOf(vm.client.cellphone) !== -1)
         {

          $mdDialog.show({
            contentElement: '#divInfoClient',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
          }).finally(function(){
              
            });
        }

      }, function (response) {
       // alert('erro');
        console.log(response);
      });   

      if(typeof cont === "undefined"){
          //location.reload();
      }
    }  

  }



this.textQr = function (ev) {
   vm.textQr=Authentication.getLogin();
}
this.LoadTimeLine = function (ev) {
    $mdDialog.show({
              contentElement: '#divProgress',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
              });

    if(Authentication.getLogin() !== null){      
        Client.listTimeLine(function (_timeline) {
         $scope.timeline = _timeline;  
         
        $mdDialog.hide();
      }, function (response) {
        $mdDialog.hide();
        console.log(response);
      });   
    }    
  }

  this.alterInfoClient = function (ev) {
   $mdDialog.show({
              contentElement: '#divProgress',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
              });
    Client.alterInfoClient(vm.name,vm.email,Authentication.getLogin(),vm.cellphoneInvitation, function(response){                
                materialAlert.toast('Informação alterada com sucesso!');  
                $mdDialog.hide();                                                
                location.reload();
              }, function(response){
                $mdDialog.hide();
                alert('erro!');
                console.log(response);
             });
  }
});
