'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  /*console.log("Log di data=>"+data);
  let housename = JSON.stringify(data);
  console.log(housename);
  housename=housename.replace("{","");
  var limiter = housename.indexOf(":");
  console.log(housename);
  housename=housename.slice(0,limiter);
  console.log(housename);
  console.log("Prova=>"+data["Serpeverde"]);*/
  
  const housename = Object.keys(data)[0];
  console.log("Casa:"+housename);
  console.log("Valore:"+data[housename]);
  if ( isNaN(data[housename])) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the Hogwarts House.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      housename:0,
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
        body: 'Couldn\'t create the new House of Hogwarts item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
