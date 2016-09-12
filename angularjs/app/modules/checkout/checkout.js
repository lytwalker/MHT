'use strict';

// -- Home page
angular.module('mhtStore.cart', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cart', {
    templateUrl: 'modules/checkout/cart.html',
    controller: 'CartCtrl'
  });
}])
.controller('CartCtrl', [function() {
}]);
