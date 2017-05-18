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
        templateUrl: 'views/card.html',
        controller: 'CardCtrl',
        controllerAs: 'card'
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
      .when('/timeLine', {
        templateUrl: 'views/timeLine.html',
        controller: 'ClientCtrl',
        controllerAs: 'client'
      })    
      .when('/ombudsman', {
        templateUrl: 'views/ombudsman.html',
        controller: 'OmbudsmanCtrl',
        controllerAs: 'ombudsman'
      })      
      .when('/board', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl',
        controllerAs: 'board'
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
  ])
  .config(['$routeProvider','$httpProvider', '$mdThemingProvider', config]);
