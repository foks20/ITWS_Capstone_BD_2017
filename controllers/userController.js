app.controller("userCtrl", function($scope, $http) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.user = data[0];
        if ($scope.user.role == "itlp") {
            $scope.toggle('profile');
        } else {
            $scope.toggle('leaderboard');
        }
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });

    $scope.toggle = function(view) {
        // Hide all center views
        $("#leaderboard").hide();
        $("#profile").hide();
        $("#events").hide();

        // Show selected view
        if (view == "events") {
            $("#events").show();
        } else if (view == "leaderboard") {
            $("#leaderboard").show();
        } else if (view == "profile") {
            $("#profile").show();
        }
    }
});