'use strict';

// Declare app level module which depends on views, and components
var mhtStore = angular.module('mhtStore', [
  'ngRoute',
  'mhtStore.home',
  'mhtStore.templates'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

// Header controller
mhtStore.controller("HeaderCtrl", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "Mandy's Hair Treasures";
	$scope.appDetails.tagline = "Quality Hair Products";

	$scope.nav = {};
	$scope.nav.isActive = function(path){
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});