'use strict';

angular.module('mhtStore.products', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
        when('/products/:categoryName/:categoryId', {
            templateUrl: 'modules/products/products.html',
            controller: 'ProductsCtrl'
        }).
        when('/products/:productId', {
                templateUrl: 'modules/products/product-details.html',
                controller: 'ProductDetailsCtrl'
            })
            .when("/cart", {
                templateUrl: "modules/checkout/cart.html",
                controller: "CartCtrl"
            })
}])
    .controller('ProductsCtrl', ProductsCtrl)
    .controller('ProductDetailsCtrl', ProductDetailsCtrl)
    .controller('CartCtrl', CartCtrl)
    .factory("cartService", CartServices);


// FUNCTIONS
// -- Products List
ProductsCtrl.$inject = ['$scope', '$http', '$routeParams', '$filter'];
function ProductsCtrl($scope, $http, $routeParams, $filter) {
    var categoryId = $routeParams.categoryId;

    // -- Get chosen category
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/categories.json').success(function (categories_data) {
        $scope.category = $filter('filter')(categories_data, function (item) {
            return item.id == categoryId;
        })[0];
        $scope.pageTitle = $scope.category.name;
        $scope.categoryId = $scope.category.id;
        $scope.description = $scope.category.description;
        $scope.banner = $scope.category.thumb;
    });

    // -- Get products - by categoryId    
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/products.json').success(function (products_data) {
        $scope.products = $filter('filter')(products_data, function (item) {
            return item.category_id == categoryId;
        });;
    });
};

// -- Products Details
ProductDetailsCtrl.$inject = ['$scope', '$http', '$routeParams', '$filter', '$sce', 'cartService'];
function ProductDetailsCtrl($scope, $http, $routeParams, $filter, $sce, cartService) {
    var productId = $routeParams.productId;

    // -- Get product from product id
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/products.json').success(function (data) {
        $scope.product = $filter('filter')(data, function (product_item) {
            return product_item.id == productId;
        })[0];
        /*$scope.mainImage = $scope.product.images[0].name;*/
        $scope.mainImage = $scope.product.preview;
        $scope.mainLength = $scope.product.prices[0].length;
        $scope.mainPrice = $scope.product.prices[0].cost;

        // -- Set page title area details based on products category
        /*$http.get('https://mandyshairtreasures-cms.herokuapp.com/categories.json').success(function (category_data) {
            $scope.category = $filter('filter')(category_data, function (category_item) {
                return category_item.id == $scope.product.category_id;
            })[0];
            
            console.log('$scope.product.category_id: ', $scope.product.category_id);
            $scope.pageTitle = $scope.category.name;
            $scope.categoryId = $scope.category.id;
            $scope.description = $scope.category.description;
            $scope.banner = $scope.category.thumb;
        });*/
    });

    // -- Update details page main image
    $scope.setImage = function (image) {
        $scope.mainImage = image.name;
    }

    // -- Update details page chosen length/price
    $scope.setPrice = function (price) {
        $scope.mainLength = price.length;
        $scope.mainPrice = price.cost;
    }

    // -- Add this product to the cart
    $scope.addToCart = function (product) {
        cartService.addToCart(product);
    }
}

// -- Cart
CartCtrl.$inject = ['$scope', 'cartService'];

function CartCtrl($scope, cartService) {
    $scope.cart = cartService.getCart();

    $scope.buy = function (product) {
        cartService.buy(product);
    }
};


// DEPENDENCIES
// -- Cart
function CartServices() {
    var cart = [];

    // Get all packges function
    return {
        getCart: function () {
            return cart;
        },
        addToCart: function (product) {
            cart.push(product);
        },
        buy: function (product) {
            alert("Congrats. You successfully purchased this product.");
        }
    }
}