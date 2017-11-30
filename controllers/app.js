var app = angular.module("bd_gamification", ['ngCookies']);

$("#center").children().hide();

var toggle = function(view) {
    // Hide all center views
    $("#center").children().hide();

    if (view == 'login') {
        $("#" + view).show()
    } else {
        $("#user").show();
        $("#" + view).show();
    }
}