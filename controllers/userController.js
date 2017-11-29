app.controller("userCtrl", function($scope, $http) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.user = data[0];
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });

    $scope.show = true;
});