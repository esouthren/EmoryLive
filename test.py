import json
import os
from os.path import join, dirname
from watson_developer_cloud import ToneAnalyzerV3

# API Call
tone_analyzer = ToneAnalyzerV3(
    username='3cd90f89-d40d-4db6-81ce-3560ebf9c28a',
    password='yqLnKoVem8bG',
    #url='https://gateway.watsonplatform.net/tone-analyzer/api',
    version='2016-05-19'
)

# Sentences = False: reads whole string. True, each sentence is analysed
# Content Type: can be text/plain or text/html

#user_input = input('What text would you like to analyse?')
user_input = "I think I'm a super happy sentence! It's just swell to meet you and converse with you and I'm very excited about this!"
'''
return_data = json.dumps(tone_analyzer.tone(text=user_input),
                 indent=2)
'''

# with open(join(dirname(__file__), 'tone.json')) as tone_json: // for reading from a json file

return_data_dict = tone_analyzer.tone(user_input,
    content_type='text/plain')
print(return_data_dict)

'''
# Emotion tones:
ANGER: return_data_dict['document_tone']['tone_categories'][0]['tones'][0]   #  add ['score'] for float score
DISGUST: return_data_dict['document_tone']['tone_categories'][0]['tones'][1]['score']
FEAR: return_data_dict['document_tone']['tone_categories'][0]['tones'][2]
JOY: '[3]'
SADNESS: [4]
ANALYTICAL: return_data_dict['document_tone']['tone_categories'][1]['tones'][0]
CONFIDENT: [1]
TENTATIVE: [2]

Scoring System: > 0.5 = 'likely', > 0.75 = 'highly likely'
'''
#print(return_data_dict['document_tone']['tone_categories'][1]['tones'][2])

emotions_dict = { 'anger' : return_data_dict['document_tone']['tone_categories'][0]['tones'][0]['score'],
                  'disgust' : return_data_dict['document_tone']['tone_categories'][0]['tones'][1]['score'],
                  'fear' : return_data_dict['document_tone']['tone_categories'][0]['tones'][2]['score'],
                  'joy' : return_data_dict['document_tone']['tone_categories'][0]['tones'][3]['score'],
                  'sadness' : return_data_dict['document_tone']['tone_categories'][0]['tones'][4]['score'],
                  'analysis' : return_data_dict['document_tone']['tone_categories'][1]['tones'][0]['score'],
                  'confidence' : return_data_dict['document_tone']['tone_categories'][1]['tones'][1]['score'],
                  'tentativeness' : return_data_dict['document_tone']['tone_categories'][1]['tones'][2]['score'],
                  'openness' : return_data_dict['document_tone']['tone_categories'][2]['tones'][0]['score'],
                  'conscientiousness' : return_data_dict['document_tone']['tone_categories'][2]['tones'][1]['score'],
                  'extraversion' : return_data_dict['document_tone']['tone_categories'][2]['tones'][2]['score'],
                  'agreeableness' : return_data_dict['document_tone']['tone_categories'][2]['tones'][3]['score'],
                  'emotional range' : return_data_dict['document_tone']['tone_categories'][2]['tones'][4]['score'],

                  }


print('User Input: {}\n\n'.format(user_input))
output = 'Nothing much to see here'
high_score = 0
high_val = 'fear'

for key in emotions_dict:
    print("{} : {}".format(key, emotions_dict[key]) )


for key in emotions_dict:
    # Find highest value, if there's no values above 0.5
    if emotions_dict[key] > high_score:
        high_score = emotions_dict[key]
        high_val = key

    if emotions_dict[key] >= 0.5:
        if emotions_dict[key] >= 0.75:
            print('This text has a lot of {} in it.'.format(key))
        else: print('This text has a little {} in it.'.format(key))

if high_score < 0.5:
    print("There's a glimmer of {} in it. ({})".format(high_val, high_score))





