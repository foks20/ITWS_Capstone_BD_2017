app.controller("profileCtrl", function($scope, $http, $cookies) {
    // Gets all events from server/database
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
        // Get events based on user
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
});