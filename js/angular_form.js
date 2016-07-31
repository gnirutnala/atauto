// define angular module/app
var formApp = angular.module('AngularSubmitForm', ["ngRoute"]);

formApp.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "partials/home.html"
    // TODO: DO NOT recycle controller for different pages
  })
  .when("/directions", {
    templateUrl : "partials/directions.html"
    // TODO: DO NOT recycle controller for different pages
  })
  .when("/contact", {
    templateUrl : "partials/contact.html"
    // TODO: DO NOT recycle controller for different pages
  })
  .when ("/car_finder", {
    templateUrl : "partials/form.html",
    controller : "FormController"
  });
});

// list students
formApp.controller('FormController', function ($scope, $http,$timeout) {

  $scope.model;
  $scope.year;
  $scope.priceRange;
  $scope.data = {
    model: null,
    availableOptions: [
      {id: '1', name: '$1,500-$3,000'},
      {id: '2', name: '$3,000-$5,000'},
      {id: '3', name: '$5,000-$10,000'},
      {id: '4', name: '$10,000-$20,000'}
    ],
  };

  $scope.PostformData = {};
  $scope.processForm = function(){
    $http({
      method  : 'POST',
      url     : 'formProcess.php?action=postFormData',
      data    : $.param($scope.PostformData),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })

    .success(function(data) {
      if (!data.success) {
        // if not successful, bind errors to error variables
        $scope.error_first_name  = data.errors.first_name;
        $scope.error_last_name   = data.errors.last_name;
        $scope.error_email       = data.errors.email;
        $scope.error_phone_num   = data.errors.phone_num;
      }
      else {
        // Hide errors If exist
        $scope.error_first_name  = "";
        $scope.error_last_name   = "";
        $scope.error_email       = "";
        $scope.phone_num         = "";
        // if successful, bind success message to message
        $scope.show_success_message        = data.message;
        $timeout(function () { $scope.show_success_message = false; }, 3000);
      }
    });
  }
});
//(window.angular);
