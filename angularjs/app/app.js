'use strict';

// Declare app level module which depends on views, and components
var mhtStore = angular.module('mhtStore', [
  'ngRoute',
  'mhtStore.home',
  'mhtStore.about',
  'mhtStore.contact',
  'mhtStore.styles',
  'mhtStore.products',
  'mhtStore.templates'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

// Header controller
mhtStore.controller("HeaderCtrl", function($scope, $location, $http) {
	$scope.appDetails = {};
	$scope.appDetails.title = "Mandy's Hair Treasures";
	$scope.appDetails.tagline = "Quality Hair Products";
    

    $http.get('https://mandyshairtreasures-cms.herokuapp.com/types.json'/*'json/types.json'*/).success(function(styles_data){
        $scope.styles = styles_data;
    });

	$scope.nav = {};
	$scope.nav.isActive = function(path){
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});

// Dependencies
// -- Packages
/*mhtStore.factory("styleService", function($http){
	var styles = [];
    
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/types.json').success(function(styles_data){
        styles = styles_data;
    });

	// Get all packges function
	return {
		getStyles: function(){
			return styles;
		}
	}
});*/