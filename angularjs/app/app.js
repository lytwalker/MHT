(function () {

    'use strict';

    // Declare app level module which depends on views, and components
    var mhtStore = angular.module('mhtStore', [
        'ngRoute',
        'ngSanitize',
        'mhtStore.home',
        'mhtStore.about',
        'mhtStore.contact',
        'mhtStore.styles',
        'mhtStore.products',
        'mhtStore.articles'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }])

    // Header controller
    .controller("HeaderCtrl", HeaderCtrl);    
    HeaderCtrl.$inject = ['$scope', '$location', '$http']; 
    function HeaderCtrl($scope, $location, $http) {
        $scope.appDetails = {};
        $scope.appDetails.title = "Mandy's Hair Treasures";
        $scope.appDetails.tagline = "Quality Hair Products";

        // -- Styles drop-down list in Nav-bar
        $http.get('https://mandyshairtreasures-cms.herokuapp.com/types.json').success(function (styles_data) {
            $scope.styles = styles_data;
        });

        $scope.nav = {};
        $scope.nav.isActive = function (path) {
            if (path === $location.path()) {
                return true;
            }
            return false;
        };
    }
    

    // DEPENDENCIES
    // --   Products
    mhtStore.factory("ProductService", ProductService);
    ProductService.$inject = ['$http'];
    function ProductService($http) {
        var products = [];

        $http.get('https://mandyshairtreasures-cms.herokuapp.com/products.json').success(function (products_data) {
            products = products_data;
        });

        // Get all product function
        return {
            getProducts: function () {
                return products;
            }
        }
    }

})();