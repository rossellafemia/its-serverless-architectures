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
<<<<<<< HEAD

=======
>>>>>>> de4f989a18eb9909f992a5a39a4c8964f6e25d2b
    return response
