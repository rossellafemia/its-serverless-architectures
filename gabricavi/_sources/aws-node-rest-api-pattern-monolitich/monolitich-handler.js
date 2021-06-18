'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
<<<<<<< HEAD
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

=======
  let params = {
    TableName: "",
  };
  switch(event.resource) {
    case "/todos":
      if (typeof data.text !== 'string') {
        console.error('Validation Failed');
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the todo item.',
        });
        return;
      }
      params = {
        TableName: process.env.DYN_T_TODOS,
        Item: {
          id: uuid.v1(),
          text: data.text,
          checked: false,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };
      break;
    case "/contacts":
      if (typeof data.name !== 'string' || typeof data.email !== 'string') {
        console.error('Validation Failed');
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the contact item.',
        });
        return;
      }
      const { name, email } = data;
      params = {
        TableName: process.env.DYN_T_CONTACTS,
        Item: {
          id: uuid.v1(),
          name,
          email,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };
      break;
  }
  
>>>>>>> de4f989a18eb9909f992a5a39a4c8964f6e25d2b
  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
<<<<<<< HEAD
        body: 'Couldn\'t create the todo item.',
=======
        body: 'Couldn\'t create the resource item.',
>>>>>>> de4f989a18eb9909f992a5a39a4c8964f6e25d2b
      });
      return;
    }

    // create a response
    const response = {
<<<<<<< HEAD
      statusCode: 200,
=======
      statusCode: 201,
>>>>>>> de4f989a18eb9909f992a5a39a4c8964f6e25d2b
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};

module.exports.get = (event, context, callback) => {
<<<<<<< HEAD
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

=======
  let params = {
    TableName: "",
  };
  switch(event.resource) {
    case "/todos/{id}":
      params = {
        TableName: process.env.DYN_T_TODOS,
        Key: {
          id: event.pathParameters.id,
        },
      };
      break;
    case "/contacts/{id}":
      params = {
        TableName: process.env.DYN_T_CONTACTS,
        Key: {
          id: event.pathParameters.id,
        },
      };
      break;
  }
  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the resource item.',
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
  let params = {
    TableName: "",
  };
  
  switch(event.resource) {
    case "/todos":
      params = {
        TableName: process.env.DYN_T_TODOS,
      };
      break;
    case "/contacts":
      params = {
        TableName: process.env.DYN_T_CONTACTS,
      };
      break;
  }
  
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the resource.',
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
  console.log(event);
  let params = {
    TableName: "",
  };
  switch(event.requestContext.resourcePath) {
    case "/todos/{id}":
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

      params = {
        TableName: process.env.DYN_T_TODOS,
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
      break;
    case "/contacts/{id}":
      // validation
      if (typeof data.name !== 'string' || typeof data.email !== 'string') {
        console.error('Validation Failed');
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t update the contact item.',
        });
        return;
      }

      params = {
        TableName: process.env.DYN_T_CONTACTS,
        Key: {
          id: event.pathParameters.id,
        },
        ExpressionAttributeNames: {
          '#contact_name': 'name',
          '#contact_email': 'email',
        },
        ExpressionAttributeValues: {
          ':name': data.name,
          ':email': data.email,
          ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET #contact_name = :name, #contact_email = :email, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
      };
      break;
  }

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the resource item.',
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
  let params = {
    TableName: "",
  };
  console.log(event);
  switch(event.requestContext.resourcePath) {
    case "/todos/{id}":
      params = {
        TableName: process.env.DYN_T_TODOS,
        Key: {
          id: event.pathParameters.id,
        },
      };
      break;
    case "/contacts/{id}":
      params = {
        TableName: process.env.DYN_T_CONTACTS,
        Key: {
          id: event.pathParameters.id,
        },
      };
      break;
  }
    
  
    // delete the todo from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove the resource item.',
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
>>>>>>> de4f989a18eb9909f992a5a39a4c8964f6e25d2b

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