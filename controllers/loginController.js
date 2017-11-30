app.controller("loginCtrl", function($scope, $http, $cookies) {
    $scope.$watch(function() { return $cookies.user; }, function(newValue) {
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
    });
});