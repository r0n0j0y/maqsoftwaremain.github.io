var app = angular.module('MAQSoftwareApp', ['ngRoute', 'ngResource']);
app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "/placeholder.html",
        controller: "HomeController"
    }).when("/hiretalent", {
        templateUrl: "/placeholder.html",
        controller: "HireTalentController"
    }).when("/expertise", {
        templateUrl: "/placeholder.html",
        controller: "ExpertiseController"
    }).when("/findwork", {
        templateUrl: "/placeholder.html",
        controller: "FindWorkController"
    }).when("/benefits", {
        templateUrl: "/placeholder.html",
        controller: "BenefitsController"
    }).when("/contacts", {
        templateUrl: "/placeholder.html",
        controller: "ContactController"
    })
        .otherwise({ redirectTo: "/" });
    $locationProvider.html5Mode(true);
}])
.controller('HomeController', ["$scope", "$location", "$window", function ($scope, $location, $window) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        navigate();
    });
    $scope.$on('$routeChangeSuccess', function () {

        console.log('Route Change: ' + $location.url());
        $window.ga('set', 'page', $location.url());
        $window.ga('send', 'pageview', {
            'hitCallback': function () {
                console.log('GA hitCallback sent!');
            }
        });
    });
}]).controller('HireTalentController', ["$scope", "$location", "$window", function ($scope, $location, $window) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        navigate();
    });
    $scope.$on('$routeChangeSuccess', function () {

        console.log('Route Change: ' + $location.url());
        $window.ga('set', 'page', $location.url());
        $window.ga('send', 'pageview', {
            'hitCallback': function () {
                console.log('GA hitCallback sent!');
            }
        });
    });
}]).controller('ExpertiseController', ["$scope", "$location", "$window", function ($scope, $location, $window) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        navigate();
    });
    $scope.$on('$routeChangeSuccess', function () {

        console.log('Route Change: ' + $location.url());
        $window.ga('set', 'page', $location.url());
        $window.ga('send', 'pageview', {
            'hitCallback': function () {
                console.log('GA hitCallback sent!');
            }
        });
    });
}]).controller('FindWorkController', ["$scope", "$location", "$window", function ($scope, $location, $window) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        navigate();
    });
    $scope.$on('$routeChangeSuccess', function () {

        console.log('Route Change: ' + $location.url());
        $window.ga('set', 'page', $location.url());
        $window.ga('send', 'pageview', {
            'hitCallback': function () {
                console.log('GA hitCallback sent!');
            }
        });
    });
}]).controller('BenefitsController', ["$scope", "$location", "$window", function ($scope, $location, $window) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        navigate();
    });
    $scope.$on('$routeChangeSuccess', function () {

        console.log('Route Change: ' + $location.url());
        $window.ga('set', 'page', $location.url());
        $window.ga('send', 'pageview', {
            'hitCallback': function () {
                console.log('GA hitCallback sent!');
            }
        });
    });
}]).controller('ContactController', ["$scope", "$location", "$window", function ($scope, $location, $window) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        navigate();
    });
    $scope.$on('$routeChangeSuccess', function () {
        //var googlemaps = document.createElement('script');
        //googlemaps.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?v=3&sensor=true&key=AIzaSyBHkJlVTrAkgcD9jJxo_CyHx0YZZtX65iY&callback=initMap');
        //document.head.appendChild(googlemaps);

        console.log('Route Change: ' + $location.url());
        $window.ga('set', 'page', $location.url());
        $window.ga('send', 'pageview', {
            'hitCallback': function () {
                console.log('GA hitCallback sent!');
            }
        });
    });
}]);