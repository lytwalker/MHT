'use strict';

// -- Home page
angular.module('mhtStore.home', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'pages/home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl', [function() {
    //$( "#page-header" ).css( "display", "none" );
}]);


// -- About page
angular.module('mhtStore.about', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'pages/about/about.html',
    controller: 'AboutCtrl'
  });
}])
.controller('AboutCtrl', [function() {
}]);


// -- Contact page
angular.module('mhtStore.contact', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact-us', {
    templateUrl: 'pages/contact/contact.html',
    controller: 'ContactCtrl'
  });
}])
.controller('ContactCtrl', [function() {
}]);