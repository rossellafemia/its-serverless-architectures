import json


def hello(event, context):
    print("hello world!!!")
    
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
<<<<<<< HEAD:__gabricavi/_sources/hello-world/handler.py
=======

>>>>>>> ba7e70dc34eb3c018e4888ac0f247b0508e51cbe:LuttatiStefano/_sources/hello-world/handler.py
    return response
