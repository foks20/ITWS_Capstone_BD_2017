app.controller("loginCtrl", function($scope, $http, $cookies) {
    $scope.$watch(function() { return $cookies.user; }, function(newValue) {
        var user = $cookies.user;
        if (user == "-1") {
            toggle('login');
        } else if (user == "0") {
            toggle('profile');
        } else {
            toggle('leaderboard');
        }
    });

    var user = $cookies.user;
    if (user) {
        if (user == "0") {
            toggle('profile');
        } else {
            toggle('leaderboard');
        }
    } else {
        $cookies.user = "-1";
        toggle('login');
    }


    $scope.setUser = function(n) {
        if (n == 0) {
            $cookies.user = "0";
        } else {
            $cookies.user = "1";
        }
        location.reload();
    }

});