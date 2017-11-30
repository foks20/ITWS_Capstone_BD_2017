app.controller("userCtrl", function($scope, $http) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        $scope.user = data[user];
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
        $("#center").children().hide();
        $("#user").show();

        // Show selected view
        if (view == "events") {
            $("#events").show();
        } else if (view == "leaderboard") {
            $("#leaderboard").show();
        } else if (view == "profile") {
            $("#profile").show();
        } else if (view == "approval") {
            $("#approval").show();
        }
    }
});