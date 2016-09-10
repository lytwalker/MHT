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
    
    // -- Get chosen style
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/types.json'/*'json/types.json'*/).success(function(types_data){
        $scope.type = $filter('filter')(types_data, function(item){
            return item.id == styleId;
        })[0];
        $scope.banner = $scope.type.banner;
        $scope.pageTitle = $scope.type.name;
        $scope.description = $scope.type.description;
    });
    
    // -- Get categories - by styleId
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/categories.json'/*'json/categories.json'*/).success(function(categories_data){
        $scope.categories = $filter('filter')(categories_data, function(item){
            return item.type_id == styleId;
        });
    });
}]);