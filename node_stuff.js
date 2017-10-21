#!/usr/bin/env node
// modules requried
const bodyParser = require('body-parser')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const express = require('express')
const fs = require('fs')

let statements = []
fs.readFile('statements.csv', function (err, data) {
  if (!err) {
    let a = data.toString().split('\n')
    for (let i in a) {
      statements[i] = a[i].toString().split(',')
    }
    statements.length = statements.length - 1
  }
})

let toneAnalyzer = new ToneAnalyzerV3({
  username: '3cd90f89-d40d-4db6-81ce-3560ebf9c28a',
  password: 'yqLnKoVem8bG',
  version_date: '2016-05-19'
})

let app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/', function (request, response) {
  let params = {
    // Get the text from the JSON file.
    text: request.body.input
  }
  toneAnalyzer.tone(params, function (error, watsonData) {
    if (error) console.log('error:', error)
    else {
      // Par se Data
      watsonData = {'anger': watsonData['document_tone']['tone_categories'][0]['tones'][0]['score'],
        'disgust': watsonData['document_tone']['tone_categories'][0]['tones'][1]['score'],
        'fear': watsonData['document_tone']['tone_categories'][0]['tones'][2]['score'],
        'joy': watsonData['document_tone']['tone_categories'][0]['tones'][3]['score'],
        'sadness': watsonData['document_tone']['tone_categories'][0]['tones'][4]['score'],
        'analysis': watsonData['document_tone']['tone_categories'][1]['tones'][0]['score'],
        'confidence': watsonData['document_tone']['tone_categories'][1]['tones'][1]['score'],
        'tentativeness': watsonData['document_tone']['tone_categories'][1]['tones'][2]['score'],
        'openness': watsonData['document_tone']['tone_categories'][2]['tones'][0]['score'],
        'conscientiousness': watsonData['document_tone']['tone_categories'][2]['tones'][1]['score'],
        'extraversion': watsonData['document_tone']['tone_categories'][2]['tones'][2]['score'],
        'agreeableness': watsonData['document_tone']['tone_categories'][2]['tones'][3]['score'],
        'emotional range': watsonData['document_tone']['tone_categories'][2]['tones'][4]['score'],
        'statements': statements
      }
      console.log(watsonData)
      response.send(watsonData)
    }
  }
  )
})

app.listen(8080, function () {
  console.log('Listening on port 8080')
})
