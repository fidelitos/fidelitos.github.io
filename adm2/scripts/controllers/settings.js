'use strict';

/**
 * @ngdoc function
 * @name fidelitosadmApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the fidelitosadmApp
 */
angular.module('fidelitosadmApp')
    .controller('SettingsCtrl', function ($rootScope, Upload, Company, materialAlert, $mdDialog) {
        var vm = this;
        vm.cadastro = {};
        vm.uploadLittle = function (file) {
            $rootScope.promise = Upload.upload({
                url: 'http://apifidelitos.azurewebsites.net/api/Image',
                data: { file: file }
            }).then(function (resp) {
                vm.cadastro.link_image_little = resp.data.url;
            });
        };

        vm.uploadLarge = function (file) {
            $rootScope.promise = Upload.upload({
                url: 'http://apifidelitos.azurewebsites.net/api/Image',
                data: { file: file }
            }).then(function (resp) {
                vm.cadastro.link_image_large = resp.data.url;
                $mdDialog.hide();
            }, function (resp) {
                console.log('Error status: ' + resp.status);
                $mdDialog.hide();
            });
        };

        vm.Update = function (ev) {
            $rootScope.promise = Company.updateInfo(vm.cadastro, function () {
                materialAlert.toast('Informações atualizadas com sucesso!');
            });
        };

        vm.Load = function (ev) {
            $rootScope.promise = Company.getInfo(function (company) {
                vm.cadastro = company;               
                $mdDialog.hide();
            });
        }

      
    });
