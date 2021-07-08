'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => { 
  console.log("Query:"+event.queryStringParameters); 
  var params = {
    TableName: process.env.MOVIES_TABLE
  };
  if(event.queryStringParameters){
    if (event.queryStringParameters.title &&!(event.queryStringParameters.director)) {
      console.log("Received title: " + event.queryStringParameters.title);
      params.FilterExpression ="#title = :title";
      params.ExpressionAttributeNames={//Gabriele se leggi questo commento, sappi che in java non ho mai visto NULLA di cosi perverso come dover definire 3 volte il nome di un campo
        "#title": "title",
      };
      params.ExpressionAttributeValues = {
        ":title": event.queryStringParameters.title,
      };
    } 
    if (event.queryStringParameters.director&&!(event.queryStringParameters.title)) {
      console.log("Received directors: " + event.queryStringParameters.director);
      params.FilterExpression ="#director = :director";
      params.ExpressionAttributeNames={
        "#director": "director",
      };
      params.ExpressionAttributeValues = {
        ":director":event.queryStringParameters.director,
      };
    }
    if(event.queryStringParameters.director && event.queryStringParameters.title){
      params.FilterExpression ="#director = :director AND #title = :title ";
      params.ExpressionAttributeNames={
        "#director": "director",
        "#title": "title",
      };
    
      params.ExpressionAttributeValues ={
        ":director": event.queryStringParameters.director,
        ":title": event.queryStringParameters.title
      };
    } 
  }
    
    
  console.log("Sono arrivato qui");
  
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the Movies.',
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
