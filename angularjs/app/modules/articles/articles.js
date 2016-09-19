'use strict';

angular.module('mhtStore.articles', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'modules/articles/articles.html',
            controller: 'articlesCtrl'
        }).
        when('/articles/:articleId', {
            templateUrl: 'modules/articles/article-details.html',
            controller: 'articleDetailsCtrl'
        })
}])
    .controller('articlesCtrl', articlesCtrl)
    .controller('articleDetailsCtrl', articleDetailsCtrl);


// FUNCTIONS
// -- articles List
articlesCtrl.$inject = ['$scope', '$http', '$routeParams'];
function articlesCtrl($scope, $http, $routeParams) {
    
    // -- page title
    $scope.pageTitle = /*$scope.name*/"";
    $scope.description = /*$scope.description*/"";
    $scope.banner = /*$scope.thumb*/"";

    // -- Get articles - by categoryId    
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/articles.json').success(function (articles_data) {        
        $scope.articles = articles_data;
    });
};

// -- articles Details
articleDetailsCtrl.$inject = ['$scope', '$http', '$routeParams', '$filter', '$sce'];
function articleDetailsCtrl($scope, $http, $routeParams, $filter, $sce) {
    var articleId = $routeParams.articleId;

    // -- Get article from article id
    $http.get('https://mandyshairtreasures-cms.herokuapp.com/articles.json').success(function (data) {
        $scope.article = $filter('filter')(data, function (article_item) {
            return article_item.id == articleId;
        })[0];
        /*$scope.mainImage = $scope.article.images[0].name;
        $scope.mainImage = $scope.article.preview;*/
    });
}