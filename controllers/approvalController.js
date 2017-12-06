app.controller("approvalCtrl", function($scope, $http, $cookies) {
    // Place holder
	
    $scope.approve = function (userid, eventid, p, appID) {
    	var data = {
    	    id: userid,
			eventID: eventid,
			points: parseInt(p),
			appID: appID
    	};

        console.log(data);

    	$http.post('/approveEvent', data).then(function(response) {
    	    $route.reload();
			$window.reload();
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