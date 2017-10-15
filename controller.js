// Angular Controller by ES
// Abevents Web Application, April 2017

// define application
var textMachine = angular.module("textMachine", ['ngAnimate']);

//define controller for application
textMachine.controller("textMachineController", function($scope, $http) {
                                                     
    $scope.response = "";
    
    $scope.first = {};
    $scope.second = {};
    $scope.third = {};
    $scope.sorted = {};   
    $scope.testVal = -1;  
       
    $scope.emoColor = ['red', 'blue'];
    $scope.emoWidth = [34,0,0,0,0,0,0,0,0,0,0];
    $scope.emoWidth[3] = 40;
      
  

    $scope.entries_cache = $scope.entries;
    
    $scope.entries = ["Welcome to our app. I'm a test sentence. It's really great to meet you! Have a nice day :D",
                     "This is the second array entry! Holy moly!"];
    
    $scope.addEntry = function() {
        $scope.entries_cache = $scope.entries;
        ($scope.entries).push(" ");
    }
	
    $scope.removeAll = function() {
        $scope.entries_cache = $scope.entries;
        for (e in $scope.entries) {
            e = '';
        }
    }
    
    $scope.woops = function() {
        $scope.entries = $scope.entries_cache;
    }
   
    
    
    $scope.callApi = function(){        
        $scope.response = "";
        
        for (var e = 0; (e < ($scope.entries).length); e++) {
            $scope.response =  ($scope.response).concat($scope.entries[e]);
        }
        
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
            
               
                    $scope.response = response;
                
                    $scope.emoWidth[0] = ($scope.response)["anger"];
                    $scope.emoWidth[1] = ($scope.response)["disgust"];
                    $scope.emoWidth[2] = ($scope.response)["fear"];
                    $scope.emoWidth[3] = ($scope.response)["joy"];
                    $scope.emoWidth[4] = ($scope.response)["sadness"];
                    $scope.emoWidth[5] = ($scope.response)["analysis"];
                    $scope.emoWidth[6] = ($scope.response)["confidence"];
                    $scope.emoWidth[7] = ($scope.response)["tentativeness"];
                    $scope.emoWidth[8] = ($scope.response)["openness"];
                    $scope.emoWidth[9] = ($scope.response)["conscientiousness"];
                    $scope.emoWidth[10] = ($scope.response)["agreeableness"];
            

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
                                                

       