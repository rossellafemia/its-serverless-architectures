'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
<<<<<<< HEAD:__gabricavi/_sources/aws-node-rest-api-pattern-services/todos/list.js
=======

>>>>>>> ba7e70dc34eb3c018e4888ac0f247b0508e51cbe:LuttatiStefano/_sources/aws-node-rest-api-pattern-services/todos/list.js

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.DYN_T_TODOS,
  };
<<<<<<< HEAD:__gabricavi/_sources/aws-node-rest-api-pattern-services/todos/list.js
  
=======
>>>>>>> ba7e70dc34eb3c018e4888ac0f247b0508e51cbe:LuttatiStefano/_sources/aws-node-rest-api-pattern-services/todos/list.js
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
