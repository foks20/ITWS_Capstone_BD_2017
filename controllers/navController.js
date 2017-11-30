app.controller("navCtrl", function($scope, $http, $cookies) {
    $scope.signOut = function() {
        $cookies.user = "-1";
        location.reload();
    }
});