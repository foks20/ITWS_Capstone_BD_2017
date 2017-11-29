app.controller("leaderboardCtrl", function($scope, $http) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.users = data;
        console.log(data)
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });
});