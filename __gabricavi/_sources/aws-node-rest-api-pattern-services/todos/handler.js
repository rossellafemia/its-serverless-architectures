'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : todosCreate} = require('./create');
const {list : todosList} = require('./list');
const {get : todosGet} = require('./get');
const {update: todosUpdate} = require('./update');
const {delete : todosDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.todoshandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return todosCreate(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return todosGet(event, context, callback); 
            }            
            return todosList(event, context, callback);            
        case "PUT":
            return todosUpdate(event, context, callback);        
        case "DELETE":
            return todosDelete(event, context, callback);
    }
    
};