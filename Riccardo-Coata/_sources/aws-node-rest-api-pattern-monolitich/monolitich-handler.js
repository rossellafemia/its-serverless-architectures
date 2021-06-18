'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the todo item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_TODOS,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

module.exports.get = (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_TODOS,
      Key: {
        id: event.pathParameters.id,
      },
    };
  
    // fetch todo from the database
    dynamoDb.get(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the todo item.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    });
  };
  

  module.exports.list = (event, context, callback) => {
    // fetch all todos from the database
    dynamoDb.scan(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the todos.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
      callback(null, response);
    });
  };


  module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
  
    // validation
    if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
      console.error('Validation Failed');
      callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the todo item.',
      });
      return;
    }
  
    const params = {
      TableName: process.env.DYNAMODB_TABLE_TODOS,
      Key: {
        id: event.pathParameters.id,
      },
      ExpressionAttributeNames: {
        '#todo_text': 'text',
      },
      ExpressionAttributeValues: {
        ':text': data.text,
        ':checked': data.checked,
        ':updatedAt': timestamp,
      },
      UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
      ReturnValues: 'ALL_NEW',
    };
  
    // update the todo in the database
    dynamoDb.update(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the todo item.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
      };
      callback(null, response);
    });
  };
  

module.exports.delete = (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_TODOS,
      Key: {
        id: event.pathParameters.id,
      },
    };
  
    // delete the todo from the database
    dynamoDb.delete(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t remove the todo item.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 204,
        body: JSON.stringify({}),
      };
      callback(null, response);
    });
  };


module.exports.handler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return this.create(event, context, callback);
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return this.get(event, context, callback);
            } else {
                return this.list(event, context, callback);
            }
        case "PUT":
            return this.update(event, context, callback);        
        case "DELETE":
            return this.delete(event, context, callback);
    }
    
};