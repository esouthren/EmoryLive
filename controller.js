// Angular Controller by ES
// Abevents Web Application, April 2017

// define controller for application
angular.module('textMachine', ['ngAnimate']).controller(
  'textMachineController',
  function ($scope, $http) {
    $scope.emoWidth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    $scope.message = "Let's find out how you're coming across today..."

    /* Statements */
    $scope.emoArray = ['anger', 'disgust', 'fear', 'joy', 'sadness', 'analysis',
      'confidence', 'tentativeness', 'openness', 'conscientiousness',
      'extraversion', 'agreeableness'
    ]

    $scope.entries_cache = $scope.entries

    $scope.entries = ["Welcome to our app. I'm a test sentence. It's really great to meet you! Have a nice day :D Try pressing 'analyse' to see the sentiments of this text. "]

    $scope.addEntry = function () {
      $scope.entries_cache = $scope.entries
      $scope.entries.push('...')
    }

    $scope.removeAll = function () {
      $scope.entries_cache = $scope.entries
      $scope.entries = []
    }

    $scope.woops = function () {
      $scope.entries = $scope.entries_cache
    }

    $scope.callApi = function () {
      $scope.response = ''

      for (let i in $scope.emoWidth) $scope.emoWidth[i] = 0

      for (let i of $scope.entries) $scope.response = $scope.response.concat(i)

      // aight here we go! Starting API Call
      $http({
        url: 'http://localhost:8080/',
        data: {
          // this is where the user input is submitted
          'input': $scope.response
        },
        method: 'POST'
        // if successful API call:
      }).success(function (response) {
        $scope.response = response

        for (let i in $scope.emoWidth) {
          $scope.emoWidth[i] =
          100 * (($scope.response)[$scope.emoArray[i]])
        }

        var index = 0
        for (let i, e = 0; i < $scope.emoWidth.length; i++) {
          if ($scope.emoWidth[i] >= e) {
            e = $scope.emoWidth[i]
            index = i
          }
        }

        // choose a message from the response
        let m = Math.floor(Math.random()) * (response.statements[index].length)
        $scope.message = response.statements[index][m]

        for (var i = 0; i < ($scope.emoWidth).length; i++) {
          $scope.emoWidth[i] = String($scope.emoWidth[i]) + '%'
        }
      })
    }
  })
