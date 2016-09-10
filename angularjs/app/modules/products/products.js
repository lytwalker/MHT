'use strict';

angular.module('mhtStore.products',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/products/:categoryName/:categoryId', {
			templateUrl: 'modules/products/products.html',
			controller: 'ProductsCtrl'
		}).
		when('/products/:productId', {
			templateUrl: 'modules/products/product-details.html',
			controller: 'ProductDetailsCtrl'
		})
}])

.controller('ProductsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){
    var categoryId = $routeParams.categoryId;
    
    // -- Get chosen category
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/categories.json'/*'json/categories.json'*/).success(function(categories_data){
        $scope.category = $filter('filter')(categories_data, function(item){
            return item.id == categoryId;
        })[0];
        $scope.pageTitle = $scope.category.name;
        $scope.categoryId = $scope.category.id;
        $scope.description = $scope.category.description;
        $scope.banner = $scope.category.thumb;
    });
    
    // -- Get products - by categoryId    
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/products.json'/*'json/products.json'*/).success(function(products_data){        
        $scope.products = $filter('filter')(products_data, function(item){
            return item.category_id == categoryId;
        });;
    });
}])

.controller('ProductDetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){
    var productId = $routeParams.productId;
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/products.json'/*'json/products.json'*/).success(function(data){
        $scope.product = $filter('filter')(data, function(d){
            return d.id == productId;
        })[0];
        /*$scope.mainImage = $scope.product.images[0].name;*/
        $scope.mainImage = $scope.product.preview;
        $scope.mainLength = $scope.product.prices[0].length;
        $scope.mainPrice = $scope.product.prices[0].cost;
    });
    
    // -- Update details page main image
    $scope.setImage = function(image){
        $scope.mainImage = image.name;
    }
    
    // -- Update details page chosen length/price
    $scope.setPrice = function(price){
        $scope.mainLength = price.length;
        $scope.mainPrice = price.cost;
    }
}]);
