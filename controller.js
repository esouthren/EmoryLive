// Angular Controller by ES
// Abevents Web Application, April 2017

// define application
var textMachine = angular.module("textMachine", ['ngAnimate']);

//define controller for application
textMachine.controller("textMachineController", function($scope, $http) {
                                                     
    $scope.response = "";
    
    $scope.sorted = {};   
    $scope.testVal = -1;  

    $scope.emoWidth = [0,0,0,0,0,0,0,0,0,0,0];
    
    $scope.message = "Let's find out how you're coming across today...";
    
    /* Statements */
    var angry = ["This too shall pass. When things fall apart, there’s no need to lose your temper. Worth trying another approach?", "Fighting fire with fire is not always the best approach. Maybe you should rethink a more pleasant reply."];
    var disgust = ["Some words can be unpleasant for others, hopefully it was not the case.",
    "Apparently something unpleasant came across, hopefully nothing major."];
    var fear = ["Perhaps fear is a great survival mechanism but sometimes it’s better to clear your mind and overcome it.", "You can’t think clearly when your mind is flooded with fear. Get over it!", "Don’t run away from your fears. Fight them!"];
    var joy = ["Glad to see you’re doing fine! Keep it that way!", "Nice to see a person who enjoys every single moment!"];
    var sadness =["Life is like a zebra. There are both black and white stripes on it. Never give up, it’s such a wonderful life.","Sometimes life turns its back on you… Good thing is – not for long."];
    var analysis = ["There’s a lot of rational thoughts in here. Also, it’s alright to be emotional sometimes, we are not robots, right?", "A thoughtful and rational person can sometimes feel a bit emotionless… Hopefully it doesn’t apply to you."];
    var confidence = ["A lot of confidence in here. Well done!","Great! Looks like you are certain in your abilities!", "Confidence is the key to success. Carry on!"];
    var tentativeness = ["Not much confidence in here… A tentative person can be perceived as doubtful.", "Doubts are not always helpful. It’s time to become more confident!"];
    var openness = ["There’s nothing better than willingness to talk with others. Just make sure you know when you shouldn’t cross the line.", "Open minded people are always best to talk with. It looks like you are one of them!"];
    var conscientiousness = ["Very well! Desire of accomplishing your goals is quite rare nowadays.", "It appears that you are an efficient and organised person. Your words speak for themselves."];
    var extraversion = ["A person’s thoughts tell a lot about their behaviour and it seems like you are an outgoing and social person.", "Your personality is what makes you yourself."];
    var agreeableness = ["Guess who gets along well with others? That’s right, you! Cooperative people are always in demand."];

    $scope.emoArray = ['angry', 'disgust', 'fear', 'joy', 'sadness', 'analysis',
                      'confidence', 'tentativeness', 'openness', 'conscientiousness', 
                      'extraversion', 'agreeableness'];
     
  
    
    $scope.entries_cache = $scope.entries;
    
    $scope.entries = ["Welcome to our app. I'm a test sentence. It's really great to meet you! Have a nice day :D"];
    
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
            
               
                    $scope.response = response;
                
                    $scope.emoWidth[0] = 100*(($scope.response)["anger"]);
                    $scope.emoWidth[1] = 100*(($scope.response)["disgust"]);
                    $scope.emoWidth[2] = 100*(($scope.response)["fear"]);
                    $scope.emoWidth[3] = 100*(($scope.response)["joy"]);
                    $scope.emoWidth[4] = 100*(($scope.response)["sadness"]);
                    $scope.emoWidth[5] = 100*(($scope.response)["analysis"]);
                    $scope.emoWidth[6] = 100*(($scope.response)["confidence"]);
                    $scope.emoWidth[7] = 100*(($scope.response)["tentativeness"]);
                    $scope.emoWidth[8] = 100*(($scope.response)["openness"]);
                    $scope.emoWidth[9] = 100*(($scope.response)["conscientiousness"]);
                    $scope.emoWidth[10] = 100*(($scope.response)["agreeableness"]);
                              
              
                  
                    var largest_val = 0;
                    var index = 1;
                    for (var i=0; i < (($scope.emoWidth).length); i++) {
                        if ($scope.emoWidth[i] >= largest_val) {
                            largest_val = $scope.emoWidth[i];
                            index = i;
                        }
                    }
                    // Fine corresponding message
        
                   switch (index) {
                        case 0:
                            $scope.message = angry[Math.floor(Math.random() * angry.length)];
                            break; 
                        case 1:
                            $scope.message = disgust[Math.floor(Math.random() * disgust.length)];
                            break; 
                        case 2:
                            $scope.message = fear[Math.floor(Math.random() * fear.length)];
                            break; 
                        case 3:
                            $scope.message = joy[Math.floor(Math.random() * joy.length)];
                            break; 
                        case 4:
                            $scope.message = sadness[Math.floor(Math.random() * sadness.length)];
                            break; 
                        case 5:
                            $scope.message = analysis[Math.floor(Math.random() * analysis.length)];
                            break; 
                        case 6:
                            $scope.message = confidence[Math.floor(Math.random() * confidence.length)];
                            break; 
                        case 7:
                            $scope.message = tentativeness[Math.floor(Math.random() * tentativeness.length)];
                            break; 
                        case 8:
                            $scope.message = openness[Math.floor(Math.random() * openness.length)];
                            break; 
                        case 9:
                            $scope.message = conscientiousness[Math.floor(Math.random() * conscientiousness.length)];
                            break; 
    
                        default:
                              $scope.message = "Hmm.. Not sure what happened there. Try again?";                                  
                                                          }
            
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
                                                

       