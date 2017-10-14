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

             

print("\ntone() example 1:\n")
print(json.dumps(tone_analyzer.tone(text='I am very happy. It is a good day.'),
                 indent=2))
