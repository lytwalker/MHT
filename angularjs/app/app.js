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
    
    // Parent controller
    .controller("ParentCtrl", ParentCtrl)
    // Header controller
    .controller("HeaderCtrl", HeaderCtrl);   
    
    ParentCtrl.$inject = ['$http']; 
    function ParentCtrl($http) {
        var parent = this;
        parent.appDetails = {};
        parent.appDetails.domainName = "https://mandyshairtreasures-cms.herokuapp.com";

        $http.get(parent.appDetails.domainName + '/types.json').success(function (types_data) {
            parent.reused_types = types_data;
        });
    }
    
    HeaderCtrl.$inject = ['$location']; 
    function HeaderCtrl($location) {
        var header = this;        
        header.title = "Mandy's Hair Treasures";
        header.tagline = "Quality Hair Products";
        //header.styles = typeService.getTypes();

        header.nav = {};
        header.nav.isActive = function (path) {
            if (path === $location.path()) {
                return true;
            }
            return false;
        };
    }

})();