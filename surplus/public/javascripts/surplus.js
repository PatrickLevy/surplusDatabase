//Angular

var app = angular.module('Surplus', ['ngResource','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-component', {
        	templateUrl: 'partials/addComponent.html',
        	controller: 'AddComponentCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
	function($scope, $resource){
		var SurplusComponents = $resource('/api/components');
        SurplusComponents.query(function(components){
            $scope.components = components;
        });

	}]);

app.controller('AddComponentCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        
    	var Suppliers = $resource('/api/suppliers');
        Suppliers.query(function(suppliers){
            $scope.suppliers = suppliers;
        });

    	// //Populate fields of suppliers page
     //    Suppliers.get({ }, function(suppliers){
     //        $scope.bike = bike;
     //    });

        $scope.save = function(){
            var Components = $resource('/api/components');
            Components.save($scope.component, function(){
                $location.path('/');
            });
        };
    }]);