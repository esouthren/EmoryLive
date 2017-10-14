// Angular Controller by ES
// Abevents Web Application, April 2017

// define application
var textMachine = angular.module("textMachine", ['ngAnimate']);

//define controller for application
textMachine.controller("textMachineController", function($scope, $http) {
                                                     
    $scope.response = "API response!";
    $scope.boop = "boop"
	
    $scope.callApi = function(){
        

        // aight here we go! Starting API Call
        $http({
            url: 'http://localhost:8080/',
            data: {
              // this is where the user input is submitted
              "input": "test string pls ignore",
	          },
	          method: "POST",
              // if successful API call:
            }).success(function(response){

              // hide the loading gif
             $scope.loading = false;
              if (!response.data[0]) {
                  console.log("nothing here boss");
                  // display error image
              }
        });
        $scope.boop = "boop boop!";
    }
                                    

                                                 
});
                                                

       