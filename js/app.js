var app = angular.module('MAQSoftwareApp', ['ngRoute', 'ngResource']);
app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
    .when("/", {
        templateUrl: "/views/home.html",
        controller: "HomeController"
    })
    .when('/expertise', {
        templateUrl: '/views/datamanagement.html',
        controller: "HomeController"
    })
    .when('/expertise/datamanagement', {
        templateUrl: '/views/datamanagement.html',
        controller: "HomeController"
    })
    .when('/expertise/artificialintelligence', {
        templateUrl: '/views/artificialintelligence.html',
        controller: "HomeController"
    })
    .when('/expertise/selfservicebi', {
        templateUrl: '/views/selfservicebi.html',
        controller: "HomeController"
    })
    .when('/expertise/selfservicebiviewall', {
        templateUrl: '/views/selfservicebiviewall.html',
        controller: "HomeController"
    })
    .when('/expertise/appdevelopment', {
        templateUrl: '/views/appdevelopment.html',
        controller: "HomeController"
    })
    .when('/expertise/cloudtransformation', {
        templateUrl: '/views/cloudtransformation.html',
        controller: "HomeController"
    })
    .when('/expertise/collaborationcontent', {
        templateUrl: '/views/collaborationcontent.html',
        controller: "HomeController"
    })
    .when('/engagement', {
        templateUrl: '/views/about.html',
        controller: "HomeController"
    })
    .when('/engagement/about', {
        templateUrl: '/views/about.html',
        controller: "HomeController"
    })
    .when('/engagement/recognitions', {
        templateUrl: '/views/recognitions.html',
        controller: "HomeController"
    })
    .when('/news', {
        templateUrl: '/views/news.html',
        controller: "NewsController"
    })
    .when('/careers', {
        templateUrl: '/views/careers.html',
        controller: "CareersController"
    })
    .when('/contact', {
        templateUrl: '/views/contact.html',
        controller: "ContactController"
    })
    .when('/powerbisupport', {
        templateUrl: '/views/powerbisupport.html',
        controller: "PowerBISupportController"
    })
    .when('/privacystatement', {
        templateUrl: '/views/privacystatement.html',
        controller: "PrivacyStatementController"
    }).otherwise({ redirectTo: "/" });
    $locationProvider.html5Mode(true);
})
.controller('HomeController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        loadNewsMainPage();
    });
}).controller('ContactController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        contactConstructor();
    });
    $scope.$on('$routeChangeSuccess', function () {        
        // load script dynamically using any method
        var googlemaps = document.createElement('script');
        googlemaps.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?v=3&sensor=true&key=AIzaSyBHkJlVTrAkgcD9jJxo_CyHx0YZZtX65iY&callback=initMap');
        document.head.appendChild(googlemaps);
        
    });
}).controller('NewsController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        newsConstructor();
    });
}).controller('CareersController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        careersConstructor();
        $("#tabs .nav-link").click(function () {           
            $("#tabs .nav-link").removeClass('active');                      
        });
    });
}).controller('PowerBISupportController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        redirectPowerBI();
    });
}).controller('PrivacyStatementController', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        loadPlugins();
        setHeader();
    });
});