import json
import time


def hello(event, context):
    body = {
        "message": "Go Serverless v1.0!",
        "input": event
    }

    time.sleep(11)

    response = {
        "statusCode": 200,
        "body": "Ciao "+event['nome']
    }

    return response
