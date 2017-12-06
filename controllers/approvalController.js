app.controller("approvalCtrl", function($scope, $http, $cookies) {
    // Place holder
	
    $scope.approveEvent = function (userid, eventid, p) {
    	var data = {
    	    id: userid,
			eventID: eventid,
			points: p
    	};

        console.log(data);

    	$http.post('/approveEvent', data).then(function(response) {
    	    location.reload();
    	}).catch(function(error) {
    	    console.error("error in posting");
    	});
    };

	$http.get("approvals").success(function(data, status, headers, config) {
        $scope.approvals = data;
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving approvals.");
    });
	
    $scope.toggle = function(view) {
        toggle(view);
    };
	
});