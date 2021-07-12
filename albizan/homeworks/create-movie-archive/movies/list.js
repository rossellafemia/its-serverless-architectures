'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {

  const queryStringParameters = event.queryStringParameters || {}
  const {director, title} = queryStringParameters;
  let filterExpression = "";
  if(director) {
    filterExpression += "director = :director";
    if(title) {
      filterExpression += " and title = :title";
    }
  } else if(title) {
    filterExpression += "title = :title";
  }
  
  const params = {
    TableName: process.env.MOVIES_TABLE
  };

  
  // console.log("Espressione di filtro: " + filterExpression);
  // Se ho almeno un query paramas aggiungo il filtro nella scan
  if(filterExpression.length) {
    params["FilterExpression"] = filterExpression;
    params["ExpressionAttributeValues"] = { 
      ':director': director,
      ':title': title
    }
  }
  

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

    /* let moviesList = result.Items;

    if(director) {
      moviesList = moviesList.filter(m => m.director === director);
    }
    if(title) {
      moviesList = moviesList.filter(m => m.title === title);
    } */

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
