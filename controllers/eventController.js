var app = angular.module("bd", []);
app.controller("eventCtrl", function($scope, $http) {
    // Gets all events from server/database
    $http.get("events").success(function(data, status, headers, config) {
        $scope.events = data;
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving events.");
    });
});
app.controller("userCtrl", function($scope, $http) {
    // Gets all events from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.user = data;
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });
});