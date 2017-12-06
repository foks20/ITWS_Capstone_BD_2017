app.controller("eventCtrl", function($scope, $http, $cookies) {
    // Gets all events from server/database
    $http.get("events").success(function(data, status, headers, config) {
        $scope.events = data;
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving events.");
    });

	$scope.signUp = function(eventid, points) {
		var data = {
    	    userId: $cookies.user,			
			eventId: eventid,
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