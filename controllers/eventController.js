app.controller("eventCtrl", function($scope, $http, $cookies) {
    // Gets all events from server/database
    $http.get("events").success(function(data, status, headers, config) {
        $scope.events = data;
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving events.");
    });

	$scope.signUp = function(eventid, eName, points) {
		var user;
		var userID;
		if ($cookies.user == "0") {
			user = "John Doe";
		} else {
			user = "Jane Doe";
		}
		$http.get('/specificUser', {params: {userName:user}} ).success(function(ans, status, headers, config) {
			$scope.user = ans;
			userID = $scope.user[0]._id;
			var data = {
				userID: userID,
				userName: user,
				eventID: eventid,
				eventName: eName,
				points: points
    	    };

			console.log(data);

			$http.post('/signUp', data).then(function(response) {
				console.log("Signed up");
			}).catch(function(error) {
				console.error("error in posting");
			});
		});
		
	};
	
    $scope.toggle = function(view) {
        toggle(view);
    };
});