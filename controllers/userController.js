app.controller("userCtrl", function($scope, $http, $cookies) {
    $scope.$watch(function() { return $cookies.user; }, function(newValue) {
        // Gets all users from server/database
        $http.get("users").success(function(data, status, headers, config) {
            // Check current user
            var user = $cookies.user;
            if (user) {
                if (user == "0") {
                    user = 0;
                } else {
                    user = 1;
                }
            } else {
                // This is just to avoid any errors, not really "right"
                user = 0;
            }
            $scope.user = data[user];
            $scope.toggle = function(view) {
                toggle(view);
            }
        }).error(function(data, status, headers, config) {
            console.log("Error retrieving users.");
        });
    });
});