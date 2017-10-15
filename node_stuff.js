var bodyParser = require("body-parser");
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '3cd90f89-d40d-4db6-81ce-3560ebf9c28a',
  password: 'yqLnKoVem8bG',
  version_date: '2016-05-19'
});

var express = require("express");

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/", function(user_request, response_to_user){    
    
    var params = {
      // Get the text from the JSON file.
      text: user_request.body.input,
    };

    tone_analyzer.tone(params, function(error, watson_data) {
      if (error) {
        console.log('error:', error);
      }
      else {
          // Parse Data
          watson_data = { 'anger' : watson_data['document_tone']['tone_categories'][0]['tones'][0]['score'],
                  'disgust' : watson_data['document_tone']['tone_categories'][0]['tones'][1]['score'],
                  'fear' : watson_data['document_tone']['tone_categories'][0]['tones'][2]['score'],
                  'joy' : watson_data['document_tone']['tone_categories'][0]['tones'][3]['score'],
                  'sadness' : watson_data['document_tone']['tone_categories'][0]['tones'][4]['score'],
                  'analysis' : watson_data['document_tone']['tone_categories'][1]['tones'][0]['score'],
                  'confidence' : watson_data['document_tone']['tone_categories'][1]['tones'][1]['score'],
                  'tentativeness' : watson_data['document_tone']['tone_categories'][1]['tones'][2]['score'],
                  'openness' : watson_data['document_tone']['tone_categories'][2]['tones'][0]['score'],
                  'conscientiousness' : watson_data['document_tone']['tone_categories'][2]['tones'][1]['score'],
                  'extraversion' : watson_data['document_tone']['tone_categories'][2]['tones'][2]['score'],
                  'agreeableness' : watson_data['document_tone']['tone_categories'][2]['tones'][3]['score'],
                  'emotional range' : watson_data['document_tone']['tone_categories'][2]['tones'][4]['score'],
                  };
          console.log(watson_data);
          
          
          response_to_user.send(watson_data);
         // var tones = response.document_tone.tone_categories.tones
          var tones = watson_data;
      }
    }
    );
});

app.listen(8080, function() {
    console.log("Listening on port 8080");
});
