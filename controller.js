// Angular Controller by ES
// Abevents Web Application, April 2017

//define controller for application
angular.module("textMachine", ['ngAnimate']).controller(
  "textMachineController", function($scope, $http) {

    $scope.emoWidth = [0,0,0,0,0,0,0,0,0,0,0];
    $scope.message = "Let's find out how you're coming across today...";

    /* Statements */
    $scope.emoArray = ['anger', 'disgust', 'fear', 'joy', 'sadness', 'analysis',
                      'confidence', 'tentativeness', 'openness', 'conscientiousness',
                      'extraversion', 'agreeableness'];



    $scope.entries_cache = $scope.entries;

    $scope.entries = ["Welcome to our app. I'm a test sentence. It's really great to meet you! Have a nice day :D Try pressing 'analyse' to see the sentiments of this text. "];

    entries = 1;
    $scope.addEntry = function() {
        $scope.entries_cache = $scope.entries;
        ($scope.entries).push("...");
        entries += 1;
    }

    $scope.removeAll = function() {
        $scope.entries_cache = $scope.entries;
        $scope.entries = [];
        entries = 0;
    }

    $scope.woops = function() {
        $scope.entries = $scope.entries_cache;

    }






    $scope.callApi = function(){
        $scope.response = "";

        for (i in $scope.emoWidth)
          $scope.emoWidth[i] = 0

        for (var e = 0; (e < ($scope.entries).length); e++) {
            $scope.response =  ($scope.response).concat($scope.entries[e]);
        }

        // aight here we go! Starting API Call
        $http({
            url: 'http://localhost:8080/',
            data: {
              // this is where the user input is submitted
              "input": $scope.response,
	          },
	          method: "POST",
              // if successful API call:
            }).success(function(response){

                    console.log($scope.entries.length)
                    $scope.response = response;

                    for (i in $scope.emoWidth)
                      $scope.emoWidth[i] = 100*(($scope.response)[$scope.emoArray[i]])

                    var largest_val = 0;
                    var index = 1;
                    for (var i=0; i < (($scope.emoWidth).length); i++) {
                        if ($scope.emoWidth[i] >= largest_val) {
                            largest_val = $scope.emoWidth[i];
                            index = i;
                        }
                    }
                    
                    // choose a message from the response
                    $scope.message = response.statements[index][
                      Math.floor(Math.random()) * (
                        response.statements[index].length
                    )]

            for (var i = 0; i < ($scope.emoWidth).length;i++) {
                        $scope.emoWidth[i] = String($scope.emoWidth[i]) + '%';
                    }



        });



    };






});
/*
 anger: 0.255687,
  disgust: 0.07021,
  fear: 0.091376,
  joy: 0.014206,
  sadness: 0.695304,
  analysis: 0,
  confidence: 0,
  tentativeness: 0,
  openness: 0.246078,
  conscientiousness: 0.275057,
  extraversion: 0.535544,
  agreeableness: 0.595745,
  'emotional range': 0.190936
  */
