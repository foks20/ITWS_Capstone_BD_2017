app.controller("formCtrl", function($scope, $http, $cookies) {
    // Gets all users from server/database
    $http.get("users").success(function(data, status, headers, config) {
        var user = $cookies.user;
        $scope.user = data[user];
        if ($scope.user)
            if ($scope.user.role == "itlp") {
                $scope.toggle('profile');
            } else {
                $scope.toggle('leaderboard');
        } else {
            $scope.toggle('login')
        }
    }).error(function(data, status, headers, config) {
        console.log("Error retrieving users.");
    });

    $(function(){
        $(".dropdown-menu li a").click(function() {
          $(".dropdown-toggle:first-child").html($(this).text() + ' <span class="caret"></span>')
          $(".dropdown-toggle:first-child").val($(this).text());
       });
    });

    $scope.formInfo = {};

    $scope.formInfo.committee = '';

    $scope.committeeSelect = function(event) {
        console.log(event);
        if (event == "Initiatives/Training") {
            $scope.formInfo.committee = "Training";
        }
        else {
            $scope.formInfo.committee = event;
        }
    }

    $scope.postData = function () {
    	var data = {
    	    name: $scope.formInfo.eventname,
    	    points: $scope.formInfo.points,
    	    details: $scope.formInfo.details,
    	    contactName: $scope.formInfo.contactname,
    	    contactEmail: $scope.formInfo.contactemail,
    	    committee: $scope.formInfo.committee
    	};
        console.log($scope.formInfo.committee);

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