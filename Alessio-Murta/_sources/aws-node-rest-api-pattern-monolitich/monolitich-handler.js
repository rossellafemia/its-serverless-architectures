'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTODO = (event, context, callback) => {
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
  dynamoDb.putTODO(params, (error) => {
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


module.exports.getTODO = (event, context, callback) => {

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
  


  module.exports.listTODO = (event, context, callback) => {

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



  module.exports.updateTODO = (event, context, callback) => {

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

    dynamoDb.updateTODO(params, (error, result) => {

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
  


module.exports.deleteTODO = (event, context, callback) => {

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


module.exports.handlerTODO = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return this.createTODO(event, context, callback);
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return this.getTODO(event, context, callback);
            } else {
                return this.listTODO(event, context, callback);
            }
        case "PUT":
            return this.updateTODO(event, context, callback);        
        case "DELETE":
            return this.deleteTODO(event, context, callback);
    }
    
};





module.exports.createTODORICH = (event, context, callback) => {
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
    TableName: process.env.DYNAMODB_TABLE_TODOS_RICH,
    Item: {
      id: uuid.v1(),
      text: data.text,
      priority: data.priority,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };





  // write the todo to the database
  dynamoDb.putTODORICH(params, (error) => {
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

module.exports.getTODORICH = (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_TODOS_RICH,
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
  

  module.exports.listTODORICH = (event, context, callback) => {
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


  module.exports.updateTODORICH = (event, context, callback) => {
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
      TableName: process.env.DYNAMODB_TABLE_TODOS_RICH,
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
  

module.exports.deleteTODORICH = (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_TODOS_RICH,
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


module.exports.handlerTODORICH = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return this.createTODORICH(event, context, callback);
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return this.getTODORICH(event, context, callback);
            } else {
                return this.listTODORICH(event, context, callback);
            }
        case "PUT":
            return this.updateTODORICH(event, context, callback);        
        case "DELETE":
            return this.deleteTODORICH(event, context, callback);
    }
    
};