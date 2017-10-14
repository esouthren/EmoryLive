import json
import os
from os.path import join, dirname
from watson_developer_cloud import ToneAnalyzerV3

tone_analyzer = ToneAnalyzerV3(
    username='3cd90f89-d40d-4db6-81ce-3560ebf9c28a',
    password='yqLnKoVem8bG',
    #url='https://gateway.watsonplatform.net/tone-analyzer/api',
    version='2016-05-19'
)

print("\ntone_chat() example 1:\n")


# Sentences = False: reads whole string. True, each sentence is analysed
# Content Type: can be text/plain or text/html

user_input = input('What text would you like to analyse?')

print("\ntone() example 1:\n")
return_data = json.dumps(tone_analyzer.tone(text=user_input, sentences=False),
                 indent=2)

return_data_dict = json.loads(return_data)
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
                  'analytical' : return_data_dict['document_tone']['tone_categories'][1]['tones'][0]['score'],
                  'confidence' : return_data_dict['document_tone']['tone_categories'][1]['tones'][1]['score'],
                  'tentativeness' : return_data_dict['document_tone']['tone_categories'][1]['tones'][2]['score']}

print('User Input: {}\n\n'.format(user_input))
output = 'Nothing much to see here'

for key in emotions_dict:
    if emotions_dict[key] >= 0.5:
        if emotions_dict[key] >= 0.75:
            output = ('This text has a lot of {} in it.\n'.format(key))
        output = ('This text has a little {} in it.\n'.format(key))

print(output)



