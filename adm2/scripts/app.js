'use strict';

/**
 * @ngdoc overview
 * @name fidelitosadmApp
 * @description
 * # fidelitosadmApp
 *
 * Main module of the application.
 */

  function config($routeProvider, $httpProvider, $mdThemingProvider) {

    $httpProvider.interceptors.push('HttpInterceptor');
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })       
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/login-client', {
        templateUrl: 'views/client_login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/card', {
        templateUrl: 'views/card.html',
        controller: 'CardCtrl',
        controllerAs: 'card'
      })
      .when('/client', {
        templateUrl: 'views/client.html',
        controller: 'ClientCtrl',
        controllerAs: 'client'
      })
      .when('/clientIndex', {
        templateUrl: 'views/client_index.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/ombudsman', {
        templateUrl: 'views/ombudsman.html',
        controller: 'OmbudsmanCtrl',
        controllerAs: 'ombudsman'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/board', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl',
        controllerAs: 'board'
      })
       .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/codes/:cardId', {
        templateUrl: 'views/codes.html',
        controller: 'CodesCtrl',
        controllerAs: 'codes'
      })
      .when('/ativacao/:ativacao_cancelamento', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })  
      .otherwise({
        redirectTo: '/'
      });
      
      $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('indigo')
      .warnPalette('deep-orange')
      .backgroundPalette('grey');

  }
angular
  .module('fidelitosadmApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'md.data.table',
    'ngMdIcons',
    'ngFileUpload',
    'ja.qr',
    'cgBusy'
  ]).value('cgBusyDefaults',{
  message:'Carregando...',
  backdrop: true
}).config(['$routeProvider','$httpProvider', '$mdThemingProvider', config]);
