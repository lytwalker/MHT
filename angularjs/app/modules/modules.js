'use strict';

// -- Wigs page
angular.module('mhtStore.styles', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/styles/:styleId/:styleName', {
      templateUrl: 'modules/styles/styles.html',
      controller: 'StylesCtrl'
  });
}])
.controller('StylesCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
    var styleId = $routeParams.styleId;
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/categories.json').success(function(categories_data){
        $scope.categories = $filter('filter')(categories_data, function(item){
            return item.type_id == styleId;
        });
        console.log("categories: ", $scope.categories);        
        
        /*$http.get('json/categoryList.json').success(function(categories_data){
        $scope.categories = $filter('filter')(categories_data, function(item){
            return item.id == $scope.style.id;
        });*/
    });
}]);