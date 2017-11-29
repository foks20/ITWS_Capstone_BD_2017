app.controller("profileCtrl", function($scope, $http) {
    // Gets all events from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.user = data[user];
        $http({
            method: 'GET',
            url: '/events',
            params: {
                id: JSON.stringify($scope.user.events)
            }
        }).success(function(data, status, headers, config) {
            $scope.events = data;
        }).error(function(data, status, headers, config) {
            console.log("Error retreiving user events.");
        });
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });

    $http.get("events").success(function(data, status, headers, config) {
        $scope.events = data.splice(0,2);
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving events.");
    });

    $scope.show = true;
});