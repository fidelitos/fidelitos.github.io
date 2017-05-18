'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
  .controller('SettingsCtrl', function (Upload, Company, materialAlert) {
    var vm = this;
    vm.cadastro = {};
    

    vm.uploadLittle = function(file){
      Upload.upload({
            url: 'http://clientefiel.azurewebsites.net/api/Image',
            data: {file: file}
        }).then(function (resp) {
            vm.cadastro.link_image_little = resp.data.url;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };

    vm.uploadLarge = function(file){
      Upload.upload({
            url: 'http://clientefiel.azurewebsites.net/api/Image',
            data: {file: file}
        }).then(function (resp) {
            vm.cadastro.link_image_large = resp.data.url;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };

    vm.Update = function(){
        Company.updateInfo(vm.cadastro, function(){
            materialAlert.toast('Informações atualizadas com sucesso!');
        }, function(response){
            //alert('erro!');
            console.log(response);
        });
    };

    function Load(){
        Company.getInfo(function(company){
            vm.cadastro = company;
        }, function(response){
            //alert('erro');
            console.log(response);
        });
    }

    Load();
  });
