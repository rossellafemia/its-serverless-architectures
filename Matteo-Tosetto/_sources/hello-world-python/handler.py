import json


def hello(event, context):
    body = {
        "message": "Go Serverless v1.0!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": "Ciao "+event['nome']
    }

    return response
