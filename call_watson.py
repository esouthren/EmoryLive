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

# Content Type: can be text/plain or text/html (html mode automatically remove HTML tags)

#user_input = input('What text would you like to analyse?')

user_input = "I think I'm a super happy sentence! It's just swell to meet you and converse with you and I'm very excited about this!"

user_input2 = "I hate these new features On #ThisPhone after the update.I hate #ThisPhoneCompany products, " \
              "you'd have to torture me to get me to use #ThisPhone. The emojis in #ThisPhone are stupid." \
              "#ThisPhone is a useless, stupid waste of money.#ThisPhone is the worst phone I've ever had - ever 😠." \
              "#ThisPhone another ripoff, lost all respect SHAME." \
              "I'm worried my #ThisPhone is going to overheat like my brother's did." \
              "#ThisPhoneCompany really let me down... my new phone won't even turn on."

user_input3 = "As I guess you've been told, the physics department has set up a new mentoring buddy scheme this year, and I've been assigned as your buddy/mentor/massively experienced PhD guru, so I just wanted to reach out and say hi! A bit about me; I did my undergrad degree in Manchester and moved to Warwick in 2015. I'm just starting the 3rd year of my PhD in the plasma physics group (the CFSA), studying how the solar wind plasma has changed over the last 20-50 years. I also demonstrate 2nd year Python programming workshops, and assist in teaching 1st year library skills. To be honest, I haven't received much information about this mentoring scheme, so I'm not sure what they're expecting me to do. Obviously if you have any problems or you're not sure who to contact about something, feel free to drop me an email or come see me (my office is PS117, I'm usually here 9 til 5 or 6). I'm always up for tea/coffee if you just want to chat to someone outside of your group (on that note, I highly recommend Research Refresh, Thursday mornings 10.30 til 12 in the Wolfson Research Exchange, 3rd floor library - free coffee and cake is always good!) If you're perfectly happy and don't want mentoring, that's good too, it's entirely up to you!"


# This is where the magic happens
return_data_dict = tone_analyzer.tone(user_input2, content_type='text/plain')
print(return_data_dict)

'''
Scoring System: > 0.5 = 'likely', > 0.75 = 'highly likely'
'''

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
#print('User Input: {}\n\n'.format(user_input))

high_score = 0
high_val = 'fear'

for key in emotions_dict:
    print("{} : {}".format(key, emotions_dict[key]) )

print("\n** Analysis **\n")

for key in emotions_dict:
    # Find highest value, if there's no values above 0.5
    if emotions_dict[key] > high_score:
        high_score = emotions_dict[key]
        high_val = key

    if 0.75 > emotions_dict[key] >= 0.5:
        print('This text has a little {} in it.'.format(key))

    if emotions_dict[key] >= 0.75:
        print('This text has a lot of {} in it.'.format(key))

if high_score < 0.5:
    print("There's a glimmer of {} in it. ({})".format(high_val, high_score))





