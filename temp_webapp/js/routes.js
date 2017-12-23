angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.accountsSummary', {
    url: '/accountsSummary',
    views: {
      'tab2': {
        templateUrl: 'templates/accountsSummary.html',
        controller: 'accountsSummaryCtrl'
      }
    }
  })

  .state('tabsController.cashflowSummary', {
    url: '/cashflowSummary',
    views: {
      'tab3': {
        templateUrl: 'templates/cashflowSummary.html',
        controller: 'cashflowSummaryCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/home')


});