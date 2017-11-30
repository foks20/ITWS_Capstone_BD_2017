app.controller("userCtrl", function($scope, $http) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.user = data[user];
        $scope.toggle = function(view) {
            toggle(view);
        }
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });
});