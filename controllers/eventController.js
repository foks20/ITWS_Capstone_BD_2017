app.controller("eventCtrl", function($scope, $http) {
    // Gets all events from server/database
    $http.get("events").success(function(data, status, headers, config) {
        $scope.events = data;
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving events.");
    });
});