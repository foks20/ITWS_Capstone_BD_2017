app.controller("formCtrl", function($scope, $http, $cookies) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        var user = $cookies.user;
        $scope.user = data[user];
        console.log(data);
        if ($scope.user.role == "itlp") {
            $scope.toggle('profile');
        } else {
            $scope.toggle('leaderboard');
        }
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });

    $scope.formInfo = {};

    $scope.postData = function () {
    	var data = {
    	    name: $scope.formInfo.eventname,
    	    points: $scope.formInfo.points,
    	    details: $scope.formInfo.details,
    	    contactName: $scope.formInfo.contactname,
    	    contactEmail: $scope.formInfo.contactemail,
    	    committee: $scope.formInfo.committee
    	};

        console.log(data);

    	$http.post('/createEvent', data).then(function(response) {
    	    location.reload();
    	}).catch(function(error) {
    	    console.error("error in posting");
    	});
    };

    $scope.toggle = function(view) {
        toggle(view);
    };
});