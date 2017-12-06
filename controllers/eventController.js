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
		alert(user);
		var query = {userName:user};
		$http.get('/specificUser', query).success(function(data, status, headers, config) {
			$scope.user = data;
			userID = $scope.user._id;
			alert(JSON.stringify(data));
		});
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
	};
	
    $scope.toggle = function(view) {
        toggle(view);
    };
});